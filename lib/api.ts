import axios from 'axios'

// Pharmacy API instance
export const pharmacyAPI = axios.create({
  baseURL: 'http://15.206.75.63:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Doctor API instance
export const doctorAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types for Pharmacy API
export interface Medicine {
  id: number
  name: string
  manufacturer: string
  details: string
  created_at: string
  updated_at: string
}

export interface Pharmacy {
  id: number
  name: string
  address: string
  latitude: string
  longitude: string
  phone_number: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface InventoryItem {
  id: number
  pharmacy: Pharmacy
  medicine: Medicine
  stock_quantity: number
  price: string
  created_at: string
  updated_at: string
}

export interface AddInventoryRequest {
  pharmacy_id: number
  medicine_id: number
  stock_quantity: number
  price: string
  created_at: string
}

export interface MedicinesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Medicine[]
}

// Types for Doctor API
export interface Patient {
  id: string
  name: string
  dob: string
  mobile_number: string
  identifiers: string
  fhir: string
  server_version: number
  updated_at: string
  deleted: boolean
  owner: number
}

export interface AddPatientRequest {
  name: string
  dob: string
  mobile_number: string
  identifiers: string
  fhir: string
  deleted: boolean
  owner: number
}

export interface HealthRecord {
  id: string
  mobile_number: string
  resource_type: string
  data: string
  server_version: number
  updated_at: string
  deleted: boolean
  patient: string
}

export interface AddRecordRequest {
  mobile_number: string
  resource_type: string
  data: string
  deleted: boolean
}

// Pharmacy API functions
export const pharmacyService = {
  async addInventory(data: AddInventoryRequest): Promise<InventoryItem> {
    const response = await pharmacyAPI.post('/api/inventory/', data)
    return response.data
  },

  async getMedicines(page: number = 1, search?: string): Promise<MedicinesResponse> {
    const params: any = { page }
    if (search && search.trim()) {
      params.search = search.trim()
    }
    const response = await pharmacyAPI.get('/api/medicines/', { params })
    return response.data
  }
}

// Doctor API functions
export const doctorService = {
  async addPatient(data: AddPatientRequest): Promise<Patient> {
    const response = await doctorAPI.post('/api/patients/', data)
    return response.data
  },

  async addRecord(data: AddRecordRequest): Promise<HealthRecord> {
    const response = await doctorAPI.post('/api/records/', data)
    return response.data
  }
}