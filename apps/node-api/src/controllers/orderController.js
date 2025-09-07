import { prisma } from '../db/db.js';

const fetchOrder = async (req, res) => {
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

export default fetchOrder;
