import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { pharmacyService, Medicine, MedicinesResponse } from '@/lib/api'
import toast from 'react-hot-toast'
import { Pill, Search, Building, Calendar, ChevronLeft, ChevronRight, Loader, Package, AlertCircle } from 'lucide-react'
import Head from 'next/head'

const MedicinesPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  // Load medicines on component mount
  useEffect(() => {
    loadMedicines(1)
  }, [])

  const loadMedicines = async (page: number, search?: string) => {
    try {
      setLoading(true)
      if (search !== undefined) {
        setSearching(true)
      }
      
      const response: MedicinesResponse = await pharmacyService.getMedicines(page, search)
      
      setMedicines(response.results)
      setTotalCount(response.count)
      setHasNext(response.next !== null)
      setHasPrevious(response.previous !== null)
      setCurrentPage(page)
      
    } catch (error: any) {
      console.error('Error loading medicines:', error)
      const errorMessage = error.response?.data?.message || 'Failed to load medicines'
      toast.error(errorMessage)
      setMedicines([])
    } finally {
      setLoading(false)
      setSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    loadMedicines(1, searchTerm.trim() || undefined)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setCurrentPage(1)
    loadMedicines(1)
  }

  const goToPage = (page: number) => {
    const search = searchTerm.trim() || undefined
    loadMedicines(page, search)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <Head>
        <title>Medicines Catalog - Pharmacy Dashboard</title>
      </Head>
      
      <Layout userType="pharmacy">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Pill className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Medicines Catalog</h1>
              </div>
              <p className="text-gray-600">
                Browse and search through available medicines in the database
              </p>
            </div>
            
            {/* Total Count */}
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Medicines</p>
              <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="card p-4">
            <form onSubmit={handleSearch} className="flex space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search medicines by name, manufacturer, or details..."
                  className="form-input pl-10"
                />
              </div>
              <button
                type="submit"
                disabled={searching}
                className="btn-primary flex items-center"
              >
                {searching ? (
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="btn-secondary"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {/* Search Results Info */}
          {searchTerm && !loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                {medicines.length > 0 
                  ? `Found ${totalCount} medicine${totalCount !== 1 ? 's' : ''} matching "${searchTerm}"`
                  : `No medicines found matching "${searchTerm}"`
                }
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <Loader className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-500">Loading medicines...</p>
              </div>
            </div>
          )}

          {/* Medicines Grid */}
          {!loading && medicines.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Pill className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      ID: {medicine.id}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {medicine.name}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{medicine.manufacturer}</span>
                    </div>
                    
                    <div className="flex items-start text-sm text-gray-600">
                      <Package className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      <span className="line-clamp-2">{medicine.details}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Added: {formatDate(medicine.created_at)}</span>
                      </div>
                      {medicine.updated_at !== medicine.created_at && (
                        <div className="flex items-center">
                          <span>Updated: {formatDate(medicine.updated_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && medicines.length === 0 && !searchTerm && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Medicines Found</h3>
              <p className="text-gray-500">
                There are no medicines available in the database at the moment.
              </p>
            </div>
          )}

          {/* No Search Results */}
          {!loading && medicines.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-500 mb-4">
                No medicines match your search criteria. Try different keywords.
              </p>
              <button
                onClick={clearSearch}
                className="btn-primary"
              >
                View All Medicines
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && medicines.length > 0 && (totalCount > medicines.length || currentPage > 1) && (
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200">
              <div className="flex items-center text-sm text-gray-700">
                <span>
                  Showing page {currentPage} of approximately {Math.ceil(totalCount / medicines.length)} pages
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={!hasPrevious || loading}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                
                <span className="px-3 py-2 text-sm text-gray-600">
                  Page {currentPage}
                </span>
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={!hasNext || loading}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">How to Use</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use the search bar to find specific medicines by name, manufacturer, or description</li>
              <li>• Browse through pages to see all available medicines</li>
              <li>• Note the Medicine ID when adding items to your inventory</li>
              <li>• Check creation and update dates to see when medicines were added or modified</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MedicinesPage