import { prisma } from '../lib/prisma.js'

export async function getAllArticles(req, res, next) {
  try {
    const articles = await prisma.knowledgeArticle.findMany({
      include: { author: true },
      orderBy: { title: 'asc' },
    })
    res.status(200).json(articles)
  } catch (err) {
    next(err)
  }
}

export async function getArticleById(req, res, next) {
  try {
    const article = await prisma.knowledgeArticle.findUnique({
      where: { id: req.params.id },
      include: { author: true },
    })

    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }

    res.status(200).json(article)
  } catch (err) {
    next(err)
  }
}