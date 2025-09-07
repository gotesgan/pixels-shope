import { prisma } from '../db/db.js';
import uniqid from 'uniqid';
import createOrderItemFromProduct from '../utils/createOrderItemFromProduct.js';
import {
  StandardCheckoutClient,
  Env,
  StandardCheckoutPayRequest,
} from 'pg-sdk-node';
import { fileURLToPath } from 'url';
import path from 'path';

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants for success/failure pages
const successPath = path.join(__dirname, '../../public/success.html');
const failedPath = path.join(__dirname, '../../public/failed.html');

// Use sandbox environment
const env = Env.SANDBOX;

// Singleton PhonePe client
let phonePeClient = null;
function getPhonePeClient(clientId, clientSecret, clientVersion, env) {
  if (!phonePeClient) {
    phonePeClient = StandardCheckoutClient.getInstance(
      clientId,
      clientSecret,
      clientVersion,
      env,
    );
  }
  return phonePeClient;
}

const sendData = async (req, res) => {
  const { simplifiedItems, amount, shippingAddressId } = req.body;
  const storeId = req.store.id;
  const customerId = req.customer.id;

  console.log('simplifiedItems', simplifiedItems);

  try {
    const [store, phonePe] = await Promise.all([
      prisma.store.findUnique({ where: { id: storeId } }),
      prisma.phonePe.findUnique({ where: { storeId } }),
    ]);

    if (!store || !phonePe) {
      return res
        .status(404)
        .json({ message: 'Store or PhonePe config not found' });
    }

    const { clientId, clientSecret, clientVersion } = phonePe;

    // ✅ Use singleton client
    const client = getPhonePeClient(
      clientId,
      clientSecret,
      clientVersion,
      process.env.NODE_ENV,
    );

    const merchantTransactionId = `TX-${uniqid()}`;
    const amountInPaise = Number(amount) * 100;
    const redirectUrl = `http://${store.domain}:3000/api/v1/pay/check/${merchantTransactionId}/${customerId}`;

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantTransactionId)
      .amount(amountInPaise)
      .redirectUrl(redirectUrl)
      .build();

    const response = await client.pay(request);
    const checkoutPageUrl = response.redirectUrl;

    // ✅ Immediately respond to the user
    res.status(200).json({ redirectUrl: checkoutPageUrl });

    // ✅ Generate and create OrderItems array
    const orderItems = await Promise.all(
      simplifiedItems.map(({ _id, quantity }) =>
        createOrderItemFromProduct(_id, quantity),
      ),
    );

    // ✅ Create order + payment
    await prisma.order.create({
      data: {
        shippingAddress: {
          connect: { id: shippingAddressId },
        },
        totalAmount: Number(amount),
        currency: 'INR',
        status: 'PENDING',
        store: {
          connect: { id: storeId },
        },
        customer: {
          connect: { id: customerId },
        },
        items: {
          create: orderItems,
        },
        payment: {
          create: {
            amount: Number(amount),
            method: 'PHONEPE',
            status: 'PENDING',
            transactionId: merchantTransactionId,
          },
        },
      },
    });

    console.log('Order and payment initialized:', merchantTransactionId);
  } catch (error) {
    console.error('Payment/Order setup failed:', error);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: 'Internal error during order/payment setup.' });
    }
  }
};

const CheckData = async (req, res) => {
  const { merchantTransactionId, id } = req.params;
  const storeId = req.store.id;

  try {
    const payment = await prisma.payment.findFirst({
      where: {
        transactionId: merchantTransactionId,
        order: {
          customerId: id,
          storeId: storeId,
        },
      },
      include: {
        order: true,
      },
    });

    if (!payment || !payment.order) {
      return res.status(404).json({ message: 'Payment or order not found.' });
    }

    const phonePe = await prisma.phonePe.findUnique({
      where: { storeId },
    });

    if (!phonePe) {
      return res
        .status(404)
        .json({ message: 'PhonePe config not found for store.' });
    }

    // ✅ Use singleton client
    const client = getPhonePeClient(
      phonePe.clientId,
      phonePe.clientSecret,
      phonePe.clientVersion,
      env,
    );

    const statusResponse = await client.getOrderStatus(merchantTransactionId);
    const state = statusResponse?.state;
    const paymentDetails = statusResponse?.paymentDetails?.[0];

    if (!paymentDetails) {
      return res
        .status(400)
        .json({ message: 'Payment details not found from PhonePe.' });
    }

    const paymentStatus = state === 'COMPLETED' ? 'COMPLETED' : 'FAILED';

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: paymentStatus,
        transactionId: paymentDetails.transactionId,
        method: 'PHONEPE',
        timestamp: new Date(paymentDetails.timestamp),
      },
    });

    const filePath = paymentStatus === 'COMPLETED' ? successPath : failedPath;
    return res.sendFile(filePath);
  } catch (error) {
    console.error('Error checking payment status:', error.message);
    return res.status(500).sendFile(failedPath);
  }
};

export { sendData, CheckData };
