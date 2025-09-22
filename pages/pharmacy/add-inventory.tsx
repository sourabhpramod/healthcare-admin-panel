import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useForm } from 'react-hook-form'
import { pharmacyService, UpdateInventoryRequest, Medicine } from '@/lib/api'
import toast from 'react-hot-toast'
import { Package, Building, Pill, DollarSign, Hash, Calendar, Loader, CheckCircle, Search, RefreshCw } from 'lucide-react'
import Head from 'next/head'

interface InventoryFormData {
  inventory_id: number
  pharmacy_id: number
  medicine_id: number
  stock_quantity: number
  price: string
}

const UpdateInventoryPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loadingMedicines, setLoadingMedicines] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<InventoryFormData>()

  const selectedMedicineId = watch('medicine_id')
  const selectedMedicine = medicines.find(m => m.id === Number(selectedMedicineId))

  // Load medicines on component mount
  useEffect(() => {
    loadMedicines()
  }, [])

  const loadMedicines = async () => {
    try {
      setLoadingMedicines(true)
      const response = await pharmacyService.getMedicines(1)
      setMedicines(response.results)
    } catch (error) {
      console.error('Error loading medicines:', error)
      toast.error('Failed to load medicines')
    } finally {
      setLoadingMedicines(false)
    }
  }

  const searchMedicines = async (search: string) => {
    try {
      setLoadingMedicines(true)
      const response = await pharmacyService.getMedicines(1, search)
      setMedicines(response.results)
    } catch (error) {
      console.error('Error searching medicines:', error)
      toast.error('Failed to search medicines')
    } finally {
      setLoadingMedicines(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      searchMedicines(searchTerm.trim())
    } else {
      loadMedicines()
    }
  }

  const onSubmit = async (data: InventoryFormData) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    
    try {
      const requestData: UpdateInventoryRequest = {
        pharmacy_id: data.pharmacy_id,
        medicine_id: data.medicine_id,
        stock_quantity: data.stock_quantity,
        price: data.price,
        created_at: new Date().toISOString()
      }

      const response = await pharmacyService.updateInventory(data.inventory_id, requestData)
      console.log('Sending request:', JSON.stringify(requestData, null, 2))

      toast.success('Inventory item updated successfully!')
      setSubmitSuccess(true)
      
      // Reset form after successful submission
      reset()
      
      console.log('Inventory updated:', response)

      
    } catch (error: any) {
      console.error('Error updating inventory:', error)
      const errorMessage = error.response?.data?.message || 'Failed to update inventory item. Please try again.'
      toast.error(errorMessage)

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Update Inventory - Pharmacy Dashboard</title>
      </Head>
      
      <Layout userType="pharmacy">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <RefreshCw className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Update Inventory</h1>
            </div>
            <p className="text-gray-600">
              Update an existing medicine in your pharmacy inventory with new stock quantity and pricing information.
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-1 rounded-full mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Inventory Updated Successfully!</h4>
                  <p className="text-sm text-green-700 mt-1">
                    The medicine inventory has been updated with the new stock and pricing information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Medicine Search */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Medicines
            </h3>
            <form onSubmit={handleSearch} className="flex space-x-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for medicines by name..."
                className="form-input flex-1"
              />
              <button
                type="submit"
                disabled={loadingMedicines}
                className="btn-primary"
              >
                {loadingMedicines ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('')
                  loadMedicines()
                }}
                className="btn-secondary"
              >
                Clear
              </button>
            </form>
          </div>

          {/* Form */}
          <div className="card p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Inventory ID */}
              <div>
                <label className="form-label">
                  <Hash className="inline h-4 w-4 mr-2" />
                  Inventory ID
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter the inventory ID to update"
                  {...register('inventory_id', { 
                    required: 'Inventory ID is required',
                    min: {
                      value: 1,
                      message: 'Inventory ID must be a positive number'
                    },
                    valueAsNumber: true
                  })}
                />
                {errors.inventory_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.inventory_id.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  The unique identifier of the inventory item you want to update
                </p>
              </div>

              {/* Pharmacy ID */}
              <div>
                <label className="form-label">
                  <Building className="inline h-4 w-4 mr-2" />
                  Pharmacy ID
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter your pharmacy ID"
                  {...register('pharmacy_id', { 
                    required: 'Pharmacy ID is required',
                    valueAsNumber: true
                  })}
                />
                {errors.pharmacy_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.pharmacy_id.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Your unique pharmacy identifier in the system
                </p>
              </div>

              {/* Medicine Selection */}
              <div>
                <label className="form-label">
                  <Pill className="inline h-4 w-4 mr-2" />
                  Select Medicine
                </label>
                <select
                  className="form-input"
                  {...register('medicine_id', { 
                    required: 'Please select a medicine',
                    valueAsNumber: true
                  })}
                >
                  <option value="">Choose a medicine...</option>
                  {medicines.map((medicine) => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.name} - {medicine.manufacturer}
                    </option>
                  ))}
                </select>
                {errors.medicine_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.medicine_id.message}</p>
                )}
                {loadingMedicines && (
                  <p className="text-blue-500 text-sm mt-1 flex items-center">
                    <Loader className="animate-spin h-3 w-3 mr-1" />
                    Loading medicines...
                  </p>
                )}
              </div>

              {/* Selected Medicine Details */}
              {selectedMedicine && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Selected Medicine Details</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Name:</strong> {selectedMedicine.name}</p>
                    <p><strong>Manufacturer:</strong> {selectedMedicine.manufacturer}</p>
                    <p><strong>Details:</strong> {selectedMedicine.details}</p>
                    <p><strong>Medicine ID:</strong> {selectedMedicine.id}</p>
                  </div>
                </div>
              )}

              {/* Stock Quantity */}
              <div>
                <label className="form-label">
                  <Hash className="inline h-4 w-4 mr-2" />
                  Stock Quantity
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter updated stock quantity"
                  {...register('stock_quantity', { 
                    required: 'Stock quantity is required',
                    min: {
                      value: 0,
                      message: 'Stock quantity cannot be negative'
                    },
                    max: {
                      value: 2147483647,
                      message: 'Stock quantity is too large'
                    },
                    valueAsNumber: true
                  })}
                />
                {errors.stock_quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.stock_quantity.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Number of units available in inventory
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="form-label">
                  <DollarSign className="inline h-4 w-4 mr-2" />
                  Price per Unit
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter updated price per unit (e.g., 25.50)"
                  {...register('price', { 
                    required: 'Price is required',
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Please enter a valid price (e.g., 25.50)'
                    }
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Updated price per unit in your local currency
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || loadingMedicines}
                  className="btn-primary flex items-center justify-center flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Updating Inventory...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Update Inventory
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => reset()}
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Important Notes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• You need the exact Inventory ID of the item you want to update</li>
              <li>• Make sure to select the correct medicine from the dropdown</li>
              <li>• Stock quantity represents the number of units available for sale</li>
              <li>• Price should be entered as a decimal number (e.g., 25.50)</li>
              <li>• Use the search function to quickly find specific medicines</li>
              <li>• Your pharmacy ID must be registered in the system</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default UpdateInventoryPage