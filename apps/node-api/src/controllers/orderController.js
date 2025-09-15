import { prisma } from '../db/db.js';

export const fetchOrder = async (req, res) => {
  const isCustomer = !!req.customer;
  const isUser = !!req.user;

  // Reject if neither customer nor user is authenticated
  if (!isCustomer && !isUser) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  const storeId = isCustomer ? req.customer.storeId : req.user.storeId;

  if (!storeId) {
    return res.status(400).json({ message: 'Missing storeId' });
  }

  // Customers can only see their orders
  const whereClause = {
    storeId,
    ...(isCustomer && { customerId: req.customer.id }),
  };

  try {
    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        items: true,
        shippingAddress: true,
        payment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

// import { prisma } from '../db/db.js';

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params; // fixed typo: req.parmas -> req.params
  const { storeId } = req.user;
  const { status } = req.body; // new status to update

  // Validate input
  const validStatuses = [
    'PENDING',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'RETURNED',
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Valid statuses are: ${validStatuses.join(
        ', '
      )}`,
    });
  }

  try {
    // Ensure order exists and belongs to the store
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder || existingOrder.storeId !== storeId) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true, shippingAddress: true, payment: true },
    });

    res.status(200).json({
      message: 'Order status updated successfully',
      data: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res
      .status(500)
      .json({ message: 'Failed to update order status', error: error.message });
  }
};
