import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { useForm } from 'react-hook-form'
import { doctorService, AddRecordRequest } from '@/lib/api'
import toast from 'react-hot-toast'
import { FileText, Phone, Tag, Database, Loader, CheckCircle } from 'lucide-react'
import Head from 'next/head'

interface RecordFormData {
  mobile_number: string
  resource_type: string
  data: string
  patient: string
}

const AddRecordPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<RecordFormData>()

  const mobileNumber = watch('mobile_number')

  const onSubmit = async (data: RecordFormData) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    
    try {
      const requestData: AddRecordRequest = {
        mobile_number: data.mobile_number, // the doctor provides this
        resource_type: data.resource_type,
        data: data.data,
        deleted: false, // default false
      }

      const response = await doctorService.addRecord(requestData)
      
      toast.success('Health record added successfully!')
      setSubmitSuccess(true)
      
      // Reset form after successful submission
      reset()
      
      console.log('Health record added:', response)
      
    } catch (error: any) {
      console.error('Error adding health record:', error)
      const errorMessage = error.response?.data?.message || 'Failed to add health record. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resourceTypes = [
    'Patient',
    'Observation',
    'Condition',
    'DiagnosticReport',
    'MedicationStatement',
    'Procedure',
    'AllergyIntolerance',
    'Immunization',
    'CarePlan',
    'Encounter'
  ]

  return (
    <>
      <Head>
        <title>Add Health Record - Doctor Dashboard</title>
      </Head>
      
      <Layout userType="doctor">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Add Health Record</h1>
            </div>
            <p className="text-gray-600">
              Create a new health record and link it to an existing patient using their mobile number.
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
                  <h4 className="text-sm font-medium text-green-800">Health Record Added Successfully!</h4>
                  <p className="text-sm text-green-700 mt-1">
                    The health record has been created and linked to the patient.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="card p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Patient Mobile Number */}
              <div>
                <label className="form-label">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Patient Mobile Number
                </label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter patient's mobile number"
                  {...register('mobile_number', { 
                    required: 'Patient mobile number is required',
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: 'Please enter a valid mobile number'
                    }
                  })}
                />
                {errors.mobile_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile_number.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  This will link the health record to the patient with this mobile number
                </p>
              </div>

              {/* Resource Type */}
              <div>
                <label className="form-label">
                  <Tag className="inline h-4 w-4 mr-2" />
                  Resource Type
                </label>
                <select
                  className="form-input"
                  {...register('resource_type', { 
                    required: 'Resource type is required'
                  })}
                >
                  <option value="">Select a resource type</option>
                  {resourceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.resource_type && (
                  <p className="text-red-500 text-sm mt-1">{errors.resource_type.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  FHIR resource type that categorizes this health record
                </p>
              </div>

              {/* Health Data */}
              <div>
                <label className="form-label">
                  <Database className="inline h-4 w-4 mr-2" />
                  Health Data
                </label>
                <textarea
                  className="form-input min-h-[150px] resize-y font-mono text-sm"
                  placeholder="Enter health record data (JSON format recommended)"
                  {...register('data', { 
                    required: 'Health data is required',
                    minLength: {
                      value: 10,
                      message: 'Health data must be at least 10 characters'
                    }
                  })}
                />
                {errors.data && (
                  <p className="text-red-500 text-sm mt-1">{errors.data.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Detailed health information, preferably in FHIR-compliant JSON format
                </p>
              </div>

             
              {/* Submit Button */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center justify-center flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Adding Record...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Add Health Record
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
          <div className="mt-6 space-y-4">
            {/* Patient Lookup Info */}
            {mobileNumber && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Patient Identification</h4>
                <p className="text-sm text-blue-700">
                  This health record will be linked to the patient with mobile number: <strong>{mobileNumber}</strong>
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Make sure this mobile number matches an existing patient in the system.
                </p>
              </div>
            )}

            {/* Usage Guidelines */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">Important Guidelines</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• The mobile number must match an existing patient in the system</li>
                <li>• Patient UUID should be obtained from the patient record</li>
                <li>• Health data should follow FHIR standards when possible</li>
                <li>• Resource type should accurately reflect the type of health information</li>
              </ul>
            </div>

            {/* Example Data */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Example Health Data</h4>
              <pre className="text-xs text-gray-700 bg-white p-3 rounded border overflow-x-auto">
{`{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "29463-7",
      "display": "Body weight"
    }]
  },
  "subject": {
    "reference": "Patient/[patient-uuid]"
  },
  "valueQuantity": {
    "value": 70,
    "unit": "kg"
  }
}`}</pre>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AddRecordPage