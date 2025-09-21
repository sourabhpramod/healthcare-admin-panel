import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { useForm } from 'react-hook-form'
import { doctorService, AddPatientRequest } from '@/lib/api'
import toast from 'react-hot-toast'
import { UserPlus, Calendar, Phone, User, FileText, Loader } from 'lucide-react'
import Head from 'next/head'

interface PatientFormData {
  name: string
  dob: string
  mobile_number: string
  identifiers: string
  fhir: string
  owner: number
}

const AddPatientPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PatientFormData>()

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    const formattedDOB = new Date(data.dob).toISOString().split('T')[0]

    try {
      const requestData: AddPatientRequest = {
        name: data.name,
        dob: formattedDOB,
        mobile_number: data.mobile_number,
        identifiers: data.identifiers,
        fhir: data.fhir,      // keep as string
        deleted: false,       // default false
        owner: data.owner // Always set to false as specified
      }
      console.log('Sending patient data:', requestData)


      const response = await doctorService.addPatient(requestData)
      
      toast.success('Patient added successfully!')
      setSubmitSuccess(true)
      
      // Reset form after successful submission
      reset()
      
      console.log('Patient added:', response)
      
    } catch (error: any) {
        console.error('Error adding patient:', error.response?.data)
        toast.error(
          error.response?.data
            ? JSON.stringify(error.response.data)
            : 'Failed to add patient.'
        )
      } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Add Patient - Doctor Dashboard</title>
      </Head>
      
      <Layout userType="doctor">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
            </div>
            <p className="text-gray-600">
              Register a new patient in the healthcare system. All fields are required for complete patient records.
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-1 rounded-full mr-3">
                  <UserPlus className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Patient Added Successfully!</h4>
                  <p className="text-sm text-green-700 mt-1">
                    The patient has been registered and can now receive health records.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="card p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Patient Name */}
              <div>
                <label className="form-label">
                  <User className="inline h-4 w-4 mr-2" />
                  Patient Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter patient's full name"
                  {...register('name', { 
                    required: 'Patient name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="form-label">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-input"
                  {...register('dob', { 
                    required: 'Date of birth is required',
                    validate: {
                      notFuture: (value) => {
                        const selectedDate = new Date(value)
                        const today = new Date()
                        return selectedDate <= today || 'Date of birth cannot be in the future'
                      }
                    }
                  })}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="form-label">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter mobile number (e.g., +1234567890)"
                  {...register('mobile_number', { 
                    required: 'Mobile number is required',
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
                  This mobile number will be used to link health records to this patient
                </p>
              </div>

              {/* Identifiers */}
              <div>
                <label className="form-label">
                  <FileText className="inline h-4 w-4 mr-2" />
                  Patient Identifiers
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter patient identifiers (ID, SSN, etc.)"
                  {...register('identifiers', { 
                    required: 'Patient identifiers are required',
                    minLength: {
                      value: 3,
                      message: 'Identifiers must be at least 3 characters'
                    }
                  })}
                />
                {errors.identifiers && (
                  <p className="text-red-500 text-sm mt-1">{errors.identifiers.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Any unique identifiers for this patient (e.g., National ID, SSN)
                </p>
              </div>

              {/* FHIR Data */}
              <div>
                <label className="form-label">
                  <FileText className="inline h-4 w-4 mr-2" />
                  FHIR Data
                </label>
                <textarea
                  className="form-input min-h-[100px] resize-y"
                  placeholder="Enter FHIR-compliant patient data (JSON format)"
                  {...register('fhir', { 
                    required: 'FHIR data is required',
                    minLength: {
                      value: 10,
                      message: 'FHIR data must be at least 10 characters'
                    }
                  })}
                />
                {errors.fhir && (
                  <p className="text-red-500 text-sm mt-1">{errors.fhir.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  FHIR-compliant patient data in JSON format
                </p>
              </div>

              {/* Owner ID */}
              <div>
                <label className="form-label">
                  <User className="inline h-4 w-4 mr-2" />
                  Owner ID
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter owner/doctor ID"
                  {...register('owner', { 
                    required: 'Owner ID is required',
                    min: {
                      value: 1,
                      message: 'Owner ID must be a positive number'
                    },
                    valueAsNumber: true
                  })}
                />
                {errors.owner && (
                  <p className="text-red-500 text-sm mt-1">{errors.owner.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  The ID of the doctor/healthcare provider responsible for this patient
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
                      Adding Patient...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Patient
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
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Important Notes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• The mobile number will be used to link health records to this patient</li>
              <li>• All patient data is stored securely and follows healthcare privacy standards</li>
              <li>• FHIR data should be properly formatted JSON for interoperability</li>
              <li>• Owner ID should correspond to a valid healthcare provider in the system</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AddPatientPage