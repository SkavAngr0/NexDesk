import { useState, useEffect } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import AssetForm from '../components/AssetForm'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import { getAllAssets, createAsset, updateAsset, deleteAsset } from '../services/assetService'
import { assetTypes, assetStatuses } from '../data/assetOptions'

function Assets() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAsset, setEditingAsset] = useState(null)

  useEffect(() => {
    loadAssets()
  }, [])

  async function loadAssets() {
    try {
      setLoading(true)
      const data = await getAllAssets()
      setAssets(data)
      setError(null)
    } catch (err) {
      setError('Failed to load assets. Is the backend server running?')
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditingAsset(null)
    setIsModalOpen(true)
  }

  function openEditModal(asset) {
    setEditingAsset(asset)
    setIsModalOpen(true)
  }

  async function handleFormSubmit(formData) {
    try {
      if (editingAsset) {
        await updateAsset(editingAsset.assetTag, formData)
      } else {
        await createAsset(formData)
      }
      setIsModalOpen(false)
      loadAssets()
    } catch (err) {
      alert('Failed to save asset. Please try again.')
    }
  }

  async function handleDelete(assetTag) {
    if (!confirm(`Delete asset ${assetTag}? This cannot be undone.`)) return

    try {
      await deleteAsset(assetTag)
      loadAssets()
    } catch (err) {
      alert('Failed to delete asset. Please try again.')
    }
  }

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === 'All' || asset.type === typeFilter
    const matchesStatus = statusFilter === 'All' || asset.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadAssets} />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Asset
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by model or serial number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm px-3 py-2"
        >
          <option value="All">All Types</option>
          {assetTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm px-3 py-2"
        >
          <option value="All">All Statuses</option>
          {assetStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="md:hidden space-y-3">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{asset.assetTag}</span>
              <Badge>{asset.status}</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">{asset.manufacturer} {asset.model}</p>
            <p className="text-xs text-gray-500 mb-3">
              {asset.type} • {asset.location?.name || 'No location'}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Assigned to {asset.assignedUser?.name || 'Unassigned'}
            </p>
            <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
              <button
                onClick={() => openEditModal(asset)}
                className="flex items-center gap-1.5 text-xs font-medium text-blue-600"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => handleDelete(asset.assetTag)}
                className="flex items-center gap-1.5 text-xs font-medium text-red-600"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}

        {filteredAssets.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-500 text-sm bg-white rounded-xl border border-gray-200">
            No assets match your search or filters.
          </div>
        )}
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Asset Tag</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Model</th>
              <th className="px-4 py-3 font-medium">Assigned User</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{asset.assetTag}</td>
                <td className="px-4 py-3 text-gray-600">{asset.type}</td>
                <td className="px-4 py-3 text-gray-600">{asset.manufacturer} {asset.model}</td>
                <td className="px-4 py-3 text-gray-600">{asset.assignedUser?.name || 'Unassigned'}</td>
                <td className="px-4 py-3 text-gray-600">{asset.location?.name || ''}</td>
                <td className="px-4 py-3"><Badge>{asset.status}</Badge></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => openEditModal(asset)} className="text-gray-400 hover:text-blue-600">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(asset.assetTag)} className="text-gray-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAssets.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-500 text-sm">
            No assets match your search or filters.
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAsset ? 'Edit Asset' : 'Add Asset'}
      >
        <AssetForm
          initialData={editingAsset}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Assets