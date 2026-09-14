import { prisma } from '../lib/prisma.js'

export async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { name: 'asc' },
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { employeeId: req.params.id },
      include: { assignedAssets: true, requestedTickets: true, assignedTickets: true },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}