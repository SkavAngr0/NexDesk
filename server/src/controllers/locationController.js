import { prisma } from '../lib/prisma.js'

export async function getAllLocations(req, res, next) {
  try {
    const locations = await prisma.location.findMany({
      include: {
        _count: {
          select: { assets: true, tickets: true },
        },
      },
      orderBy: { name: 'asc' },
    })
    res.status(200).json(locations)
  } catch (err) {
    next(err)
  }
}