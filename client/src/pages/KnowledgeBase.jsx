import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { articles, kbCategories } from '../data/mockKnowledgeBase'

function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Knowledge Base</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          {kbCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            to={`/knowledge-base/${article.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-3">
              {article.category}
            </span>
            <h2 className="font-semibold text-gray-900 mb-2">{article.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">{article.problem}</p>
            <p className="text-xs text-gray-400 mt-3">Updated {article.lastUpdated}</p>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="px-4 py-10 text-center text-gray-500 text-sm">
          No articles match your search or filters.
        </div>
      )}
    </div>
  )
}

export default KnowledgeBase