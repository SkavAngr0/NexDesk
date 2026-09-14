import { prisma } from '../lib/prisma.js'

export async function getAllTickets(req, res, next) {
  try {
    const tickets = await prisma.ticket.findMany({
      include: { location: true, asset: true, requester: true, technician: true },
      orderBy: { createdAt: 'desc' },
    })
    res.status(200).json(tickets)
  } catch (err) {
    next(err)
  }
}

export async function getTicketById(req, res, next) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { ticketNumber: req.params.id },
      include: { location: true, asset: true, requester: true, technician: true },
    })

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' })
    }

    res.status(200).json(ticket)
  } catch (err) {
    next(err)
  }
}

export async function createTicket(req, res, next) {
  try {
    const { title, description, priority, category, requesterId } = req.body

    if (!title || !description || !priority || !category || !requesterId) {
      return res.status(400).json({ error: 'Title, description, priority, category, and requester are required' })
    }

    const lastTicket = await prisma.ticket.findFirst({
      orderBy: { ticketNumber: 'desc' },
    })
    const nextNumber = lastTicket ? parseInt(lastTicket.ticketNumber.split('-')[1]) + 1 : 1001

    const ticket = await prisma.ticket.create({
      data: {
        ticketNumber: `TCK-${nextNumber}`,
        title,
        description,
        category,
        priority,
        status: 'Open',
        locationId: req.body.locationId || null,
        assetId: req.body.assetId || null,
        requesterId,
        technicianId: req.body.technicianId || null,
      },
    })

    res.status(201).json(ticket)
  } catch (err) {
    next(err)
  }
}

export async function updateTicket(req, res, next) {
  try {
    const existing = await prisma.ticket.findUnique({ where: { ticketNumber: req.params.id } })

    if (!existing) {
      return res.status(404).json({ error: 'Ticket not found' })
    }

    const ticket = await prisma.ticket.update({
      where: { ticketNumber: req.params.id },
      data: req.body,
    })

    res.status(200).json(ticket)
  } catch (err) {
    next(err)
  }
}

export async function deleteTicket(req, res, next) {
  try {
    const existing = await prisma.ticket.findUnique({ where: { ticketNumber: req.params.id } })

    if (!existing) {
      return res.status(404).json({ error: 'Ticket not found' })
    }

    await prisma.ticket.delete({ where: { ticketNumber: req.params.id } })

    res.status(200).json({ message: 'Ticket deleted successfully' })
  } catch (err) {
    next(err)
  }
}