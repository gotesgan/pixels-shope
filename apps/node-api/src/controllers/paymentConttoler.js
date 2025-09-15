import crypto from 'crypto';
import { prisma } from '../db/db.js';
import uniqid from 'uniqid';
import createOrderItemFromProduct from '../utils/createOrderItemFromProduct.js';
import getRazorpayClient from '../utils/razorpayClient.js';

// ✅ Create Razorpay Order
export const createOrder = async (req, res) => {
  const storeId = req.store.id;
  const customerId = req.customer.id;
  const { simplifiedItems, amount, shippingAddressId } = req.body;

  try {
    // 1️⃣ Get Razorpay credentials for this store
    const razorpayConfig = await prisma.razorpay.findUnique({
      where: { storeId },
    });

    if (!razorpayConfig) {
      return res.status(404).json({ message: 'Razorpay config not found' });
    }

    // 2️⃣ Init client dynamically
    const razorpay = getRazorpayClient(
      storeId,
      razorpayConfig.keyId,
      razorpayConfig.keySecret
    );

    // 3️⃣ Create order in Razorpay
    const options = {
      amount: Number(amount) * 100, // in paise
      currency: 'INR',
      receipt: `rcpt_${uniqid()}`,
    };

    const razorOrder = await razorpay.orders.create(options);
    console.log(razorOrder);
    // 4️⃣ Generate and create OrderItems array
    const orderItems = await Promise.all(
      simplifiedItems.map(({ _id, quantity }) =>
        createOrderItemFromProduct(_id, quantity)
      )
    );

    // 5️⃣ Save order + payment in DB
    await prisma.order.create({
      data: {
        shippingAddress: { connect: { id: shippingAddressId } },
        totalAmount: Number(amount),
        currency: 'INR',
        status: 'PENDING',
        store: { connect: { id: storeId } },
        customer: { connect: { id: customerId } },
        items: { create: orderItems },
        payment: {
          create: {
            amount: Number(amount),
            method: 'RAZORPAY',
            status: 'PENDING',
            transactionId: razorOrder.id, // save Razorpay orderId
            store: { connect: { id: storeId } },
          },
        },
      },
    });

    // 6️⃣ Send details back to frontend
    return res.json({
      key: razorpayConfig.keyId,
      amount: options.amount,
      currency: options.currency,
      orderId: razorOrder.id,
    });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// ✅ Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  const storeId = req.store.id;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    // 1️⃣ Get Razorpay config for this store
    const razorpayConfig = await prisma.razorpay.findUnique({
      where: { storeId },
    });

    if (!razorpayConfig) {
      return res.status(404).json({ message: 'Razorpay config not found' });
    }

    // 2️⃣ Init Razorpay client dynamically
    const razorpay = getRazorpayClient(
      storeId,
      razorpayConfig.keyId,
      razorpayConfig.keySecret
    );

    // 3️⃣ Verify signature
    const hmac = crypto.createHmac('sha256', razorpayConfig.keySecret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // 4️⃣ Fetch payment details from Razorpay to check status
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    // 5️⃣ Find DB payment record
    const payment = await prisma.payment.findFirst({
      where: { transactionId: razorpay_order_id },
      include: { order: true },
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    // 6️⃣ Update DB based on payment status
    if (paymentDetails.status === 'captured') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          method: 'RAZORPAY',
          transactionId: razorpay_payment_id,
        },
      });

      await prisma.order.update({
        where: { id: payment.order.id },
        data: { status: 'PROCESSING' },
      });

      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      });

      await prisma.order.update({
        where: { id: payment.order.id },
        data: { status: 'PENDING' },
      });

      return res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (err) {
    console.error('Payment verification failed:', err);
    res.status(500).json({
      message: 'Internal error verifying payment',
      error: err.message,
    });
  }
};
export const fetchPayments = async (req, res) => {
  const storeId = req.user?.storeId;
  // console.log(req.user);

  if (!storeId) {
    return res.status(400).json({ message: 'Missing storeId' });
  }

  try {
    const payments = await prisma.payment.findMany({
      where: { order: { storeId } },
      include: { order: true },
      orderBy: { timestamp: 'desc' },
    });

    res.status(200).json(payments);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res
      .status(500)
      .json({ message: 'Failed to fetch payments', error: err.message });
  }
};

// ✅ Fetch payment by ID (or transactionId)
export const fetchPaymentById = async (req, res) => {
  const { id } = req.params; // this can be payment.id or transactionId
  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (err) {
    console.error('Error fetching payment:', err);
    res
      .status(500)
      .json({ message: 'Failed to fetch payment', error: err.message });
  }
};
