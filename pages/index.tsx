import React from 'react'
import Link from 'next/link'
import { Stethoscope, ShoppingCart, ArrowRight, Users, FileText, Package, Heart } from 'lucide-react'
import Head from 'next/head'

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Healthcare Admin Panel - Choose Your Role</title>
        <meta name="description" content="Healthcare administration panel for doctors and pharmacies" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Healthcare Admin Panel
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your healthcare operations with our comprehensive admin panel. 
              Manage patient records, inventory, and more with ease.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Doctor Panel */}
            <Link href="/doctor" className="group">
              <div className="card p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200">
                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                    <Stethoscope className="h-10 w-10 text-blue-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Doctor Panel
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Manage patient records, add new patients, and create digital health records 
                    with comprehensive patient management tools.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-3 text-blue-500" />
                      Add and manage patients
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-3 text-blue-500" />
                      Create digital health records
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Heart className="h-4 w-4 mr-3 text-blue-500" />
                      Patient care management
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Access Doctor Panel
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Pharmacy Panel */}
            <Link href="/pharmacy" className="group">
              <div className="card p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-200">
                <div className="text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                    <ShoppingCart className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Pharmacy Panel
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Manage your pharmacy inventory, update stock levels, track medicines, 
                    and maintain comprehensive inventory records.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-gray-600">
                      <Package className="h-4 w-4 mr-3 text-green-500" />
                      Inventory management
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ShoppingCart className="h-4 w-4 mr-3 text-green-500" />
                      Stock level tracking
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-3 text-green-500" />
                      Medicine catalog
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                    Access Pharmacy Panel
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Why Choose Our Platform?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Patient-Centered</h4>
                <p className="text-gray-600 text-sm">
                  Built with patient care and safety as the top priority
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Digital Records</h4>
                <p className="text-gray-600 text-sm">
                  Comprehensive digital health record management system
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-6 w-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Inventory Control</h4>
                <p className="text-gray-600 text-sm">
                  Advanced pharmacy inventory and stock management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage