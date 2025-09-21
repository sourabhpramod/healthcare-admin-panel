import React from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { Package, Pill, TrendingUp, AlertCircle, ShoppingCart, Plus } from 'lucide-react'
import Head from 'next/head'

const PharmacyDashboard: React.FC = () => {
  const quickActions = [
    {
      title: 'Add to Inventory',
      description: 'Add new medicines to your pharmacy inventory',
      href: '/pharmacy/add-inventory',
      icon: Plus,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      title: 'View Medicines',
      description: 'Browse and search through available medicines',
      href: '/pharmacy/medicines',
      icon: Pill,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    }
  ]

  const stats = [
    {
      label: 'Total Medicines',
      value: 'N/A',
      icon: Pill,
      color: 'text-blue-600'
    },
    {
      label: 'Inventory Items',
      value: 'N/A',
      icon: Package,
      color: 'text-green-600'
    },
    {
      label: 'Low Stock',
      value: 'N/A',
      icon: AlertCircle,
      color: 'text-red-600'
    },
    {
      label: 'Total Value',
      value: 'N/A',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ]

  return (
    <>
      <Head>
        <title>Pharmacy Dashboard - Healthcare Admin</title>
      </Head>
      
      <Layout userType="pharmacy">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome to Pharmacy Panel</h1>
                <p className="text-green-100">
                  Manage your inventory and track medicine availability
                </p>
              </div>
              <div className="hidden md:block">
                <ShoppingCart className="h-16 w-16 text-green-200" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href} className="group">
                  <div className="card p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent group-hover:border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${action.color} ${action.hoverColor} transition-colors duration-200`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                          {action.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Inventory Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Additions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-green-600" />
                Recent Inventory Additions
              </h3>
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent additions to display</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start by adding medicines to your inventory
                </p>
              </div>
            </div>

            {/* Low Stock Alert */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                Low Stock Alerts
              </h3>
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No low stock alerts</p>
                <p className="text-sm text-gray-400 mt-1">
                  All inventory levels are sufficient
                </p>
              </div>
            </div>
          </div>

          {/* Pharmacy Features */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-800 mb-2">Pharmacy Panel Features</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Add medicines to inventory with stock quantities and pricing</li>
              <li>• Search and browse through available medicines database</li>
              <li>• Track inventory levels and manage stock</li>
              <li>• View medicine details including manufacturer and descriptions</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default PharmacyDashboard