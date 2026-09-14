import { prisma } from '../lib/prisma.js'

export async function getAllAssets(req, res, next) {
  try {
    const assets = await prisma.asset.findMany({
      include: { location: true, assignedUser: true },
      orderBy: { assetTag: 'asc' },
    })
    res.status(200).json(assets)
  } catch (err) {
    next(err)
  }
}

export async function getAssetById(req, res, next) {
  try {
    const asset = await prisma.asset.findUnique({
      where: { assetTag: req.params.id },
      include: { location: true, assignedUser: true, tickets: true },
    })

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' })
    }

    res.status(200).json(asset)
  } catch (err) {
    next(err)
  }
}

export async function createAsset(req, res, next) {
  try {
    const { type, manufacturer, model, serialNumber } = req.body

    if (!type || !serialNumber) {
      return res.status(400).json({ error: 'Asset type and serial number are required' })
    }

    const lastAsset = await prisma.asset.findFirst({
      orderBy: { assetTag: 'desc' },
    })
    const nextNumber = lastAsset ? parseInt(lastAsset.assetTag.split('-')[1]) + 1 : 1

    const asset = await prisma.asset.create({
      data: {
        assetTag: `AST-${String(nextNumber).padStart(4, '0')}`,
        type,
        manufacturer,
        model,
        serialNumber,
        os: req.body.os || null,
        status: req.body.status || 'Available',
        purchaseDate: req.body.purchaseDate ? new Date(req.body.purchaseDate) : null,
        warrantyExpiry: req.body.warrantyExpiry ? new Date(req.body.warrantyExpiry) : null,
        notes: req.body.notes || '',
        locationId: req.body.locationId || null,
        assignedUserId: req.body.assignedUserId || null,
      },
    })

    res.status(201).json(asset)
  } catch (err) {
    next(err)
  }
}

export async function updateAsset(req, res, next) {
  try {
    const existing = await prisma.asset.findUnique({ where: { assetTag: req.params.id } })

    if (!existing) {
      return res.status(404).json({ error: 'Asset not found' })
    }

    const asset = await prisma.asset.update({
      where: { assetTag: req.params.id },
      data: req.body,
    })

    res.status(200).json(asset)
  } catch (err) {
    next(err)
  }
}

export async function deleteAsset(req, res, next) {
  try {
    const existing = await prisma.asset.findUnique({ where: { assetTag: req.params.id } })

    if (!existing) {
      return res.status(404).json({ error: 'Asset not found' })
    }

    await prisma.asset.delete({ where: { assetTag: req.params.id } })

    res.status(200).json({ message: 'Asset deleted successfully' })
  } catch (err) {
    next(err)
  }
}