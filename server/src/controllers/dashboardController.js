import { prisma } from '../lib/prisma.js'

export async function getDashboardStats(req, res, next) {
  try {
    const [
      totalAssets,
      activeDevices,
      underRepair,
      available,
      openTickets,
      resolvedThisMonth,
      recentTickets,
      assetsByType,
      ticketsByStatus,
    ] = await Promise.all([
      prisma.asset.count(),
      prisma.asset.count({ where: { status: 'Active' } }),
      prisma.asset.count({ where: { status: 'Under Repair' } }),
      prisma.asset.count({ where: { status: 'Available' } }),
      prisma.ticket.count({ where: { status: 'Open' } }),
      prisma.ticket.count({
        where: {
          status: 'Resolved',
          updatedAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
        },
      }),
      prisma.ticket.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { requester: true },
      }),
      prisma.asset.groupBy({
        by: ['type'],
        _count: true,
      }),
      prisma.ticket.groupBy({
        by: ['status'],
        _count: true,
      }),
    ])

    res.status(200).json({
      totalAssets,
      activeDevices,
      underRepair,
      available,
      openTickets,
      resolvedThisMonth,
      recentTickets,
      assetsByType,
      ticketsByStatus,
    })
  } catch (err) {
    next(err)
  }
}