import React from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { UserPlus, FileText, Users, Activity, Clock, Heart } from 'lucide-react'
import Head from 'next/head'

const DoctorDashboard: React.FC = () => {
  const quickActions = [
    {
      title: 'Add New Patient',
      description: 'Register a new patient in the system',
      href: '/doctor/add-patient',
      icon: UserPlus,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Add Health Record',
      description: 'Create a new health record for existing patients',
      href: '/doctor/add-record',
      icon: FileText,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ]

  const stats = [
    {
      label: 'Total Patients',
      value: 'N/A',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Health Records',
      value: 'N/A',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      label: 'Active Cases',
      value: 'N/A',
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      label: 'Today\'s Records',
      value: 'N/A',
      icon: Clock,
      color: 'text-orange-600'
    }
  ]

  return (
    <>
      <Head>
        <title>Doctor Dashboard - Healthcare Admin</title>
      </Head>
      
      <Layout userType="doctor">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, Doctor</h1>
                <p className="text-blue-100">
                  Manage your patients and health records efficiently
                </p>
              </div>
              <div className="hidden md:block">
                <Heart className="h-16 w-16 text-blue-200" />
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
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

          {/* Recent Activity */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent activity to display</p>
              <p className="text-sm text-gray-400 mt-1">
                Start by adding patients or health records to see activity here
              </p>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Doctor Panel Features</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Add and manage patient information</li>
              <li>• Create comprehensive health records</li>
              <li>• Link health records to patients via mobile number</li>
              <li>• Track patient care and medical history</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default DoctorDashboard