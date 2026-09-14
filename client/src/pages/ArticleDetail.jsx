import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import { getArticleById } from '../services/knowledgeService'

function ArticleDetail() {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadArticle()
  }, [articleId])

  async function loadArticle() {
    try {
      setLoading(true)
      const data = await getArticleById(articleId)
      setArticle(data)
      setError(null)
    } catch (err) {
      setError('Article not found.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Skeleton className="h-5 w-40 mb-4" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div>
        <p className="text-gray-500 mb-2">{error || 'Article not found.'}</p>
        <Link to="/knowledge-base" className="text-blue-600 text-sm font-medium">
          Back to Knowledge Base
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/knowledge-base" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4">
        <ArrowLeft size={16} />
        Back to Knowledge Base
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-3">
          {article.category}
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h1>
        <p className="text-xs text-gray-400 mb-6">By {article.author.name}</p>

        <h2 className="font-semibold text-gray-900 mb-2">Problem</h2>
        <p className="text-sm text-gray-600 mb-6">{article.problem}</p>

        <h2 className="font-semibold text-gray-900 mb-2">Steps</h2>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          {article.steps.map((step, index) => (
            <li key={index} className="text-sm text-gray-600">{step}</li>
          ))}
        </ol>

        <h2 className="font-semibold text-gray-900 mb-2">Solution</h2>
        <p className="text-sm text-gray-600">{article.solution}</p>
      </div>
    </div>
  )
}

export default ArticleDetail