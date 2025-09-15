import { prisma } from '../db/db.js';
import Product from '../models/Product.js';
export const getCustomerAnalytics = async (req, res) => {
  const storeId = req.store?.id;

  if (!storeId) {
    return res.status(400).json({ message: 'Missing storeId' });
  }

  try {
    // Fetch all customers for this store
    const customers = await prisma.customer.findMany({
      where: { storeId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        // createdAt: true,
        orders: {
          select: {
            id: true,
            totalAmount: true,
          },
        },
      },
    });

    // Map customers to analytics format
    const customerAnalytics = customers.map((customer) => {
      const totalSpent = customer.orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      );

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        orders: customer.orders.length,
        totalSpent,

        status: 'Active', // You can make this dynamic if needed
      };
    });

    res.status(200).json(customerAnalytics);
  } catch (err) {
    console.error('Error fetching customer analytics:', err);
    res.status(500).json({
      message: 'Failed to fetch customer analytics',
      error: err.message,
    });
  }
};

export const getStoreAnalytics = async (req, res) => {
  try {
    const storeId = req.store?.id;
    if (!storeId) return res.status(400).json({ error: 'Store not found' });

    // 1️⃣ Total Orders & Revenue
    const totalOrders = await prisma.order.count({ where: { storeId } });
    const revenueResult = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { storeId },
    });
    const totalRevenue = revenueResult._sum.totalAmount || 0;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // 2️⃣ Orders by Status (for Pie/Donut chart)
    const ordersByStatusRaw = await prisma.order.groupBy({
      by: ['status'],
      where: { storeId },
      _count: { status: true },
    });
    const ordersByStatus = ordersByStatusRaw.map((o) => ({
      status: o.status,
      count: o._count.status,
    }));

    // 3️⃣ Orders & Revenue by Day (Line chart)
    const ordersByDayRaw = await prisma.order.findMany({
      where: { storeId },
      select: { totalAmount: true, createdAt: true },
    });
    // Aggregate by day
    const ordersByDayMap = {};
    ordersByDayRaw.forEach((o) => {
      const day = o.createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
      if (!ordersByDayMap[day]) ordersByDayMap[day] = { orders: 0, revenue: 0 };
      ordersByDayMap[day].orders += 1;
      ordersByDayMap[day].revenue += o.totalAmount;
    });
    const ordersByDay = Object.entries(ordersByDayMap).map(([date, data]) => ({
      date,
      ...data,
    }));

    // 4️⃣ Top 5 Products (Bar chart)
    const topProductsRaw = await prisma.orderItem.groupBy({
      by: ['productId', 'sku'],
      where: { order: { storeId } },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
    const topProducts = topProductsRaw.map((p) => ({
      productId: p.productId,
      sku: p.sku,
      sold: p._sum.quantity,
    }));

    // Send everything in a single object
    res.json({
      summary: { totalOrders, totalRevenue, avgOrderValue },
      ordersByStatus,
      ordersByDay,
      topProducts,
    });
  } catch (error) {
    console.error('Error fetching store analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// import { prisma } from '../db/db.js';
// import Product from '../models/Product.js'; // Mongoose model

export const getStoreSummary = async (req, res) => {
  try {
    const storeId = req.store?.id;
    if (!storeId) {
      return res.status(400).json({ error: 'Store not found in request.' });
    }

    // 1️⃣ Active Orders (Postgres)
    const activeOrdersCount = await prisma.order.count({
      where: {
        storeId,
        status: {
          in: ['PENDING', 'PROCESSING', 'SHIPPED'],
        },
      },
    });

    // 2️⃣ Total Customers (Postgres)
    const totalCustomers = await prisma.customer.count({
      where: { storeId },
    });

    // 3️⃣ Monthly Revenue (Postgres) — only completed payments
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);

    const revenueResult = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        storeId,
        payment: {
          status: 'COMPLETED', // Only count orders with completed payment
        },
        createdAt: {
          gte: lastMonth,
          lte: now,
        },
      },
    });
    const monthlyRevenue = revenueResult._sum.totalAmount || 0;

    // 4️⃣ Total Products (MongoDB)
    const totalProducts = await Product.countDocuments({ storeId });

    res.json({
      activeOrders: activeOrdersCount,
      totalCustomers,
      monthlyRevenue,
      totalProducts,
    });
  } catch (error) {
    console.error('Error fetching store summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
