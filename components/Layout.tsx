import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  Home,
  UserPlus,
  FileText,
  Package,
  Pill,
  Menu,
  X,
  Stethoscope,
  ShoppingCart
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  userType?: 'doctor' | 'pharmacy'
}

const Layout: React.FC<LayoutProps> = ({ children, userType }) => {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const doctorNavItems = [
    { name: 'Dashboard', href: '/doctor', icon: Home },
    { name: 'Add Patient', href: '/doctor/add-patient', icon: UserPlus },
    { name: 'Add Health Record', href: '/doctor/add-record', icon: FileText },
  ]

  const pharmacyNavItems = [
    { name: 'Dashboard', href: '/pharmacy', icon: Home },
    { name: 'Add to Inventory', href: '/pharmacy/add-inventory', icon: Package },
    { name: 'View Medicines', href: '/pharmacy/medicines', icon: Pill },
  ]

  const navItems = userType === 'doctor' ? doctorNavItems : pharmacyNavItems

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {userType === 'doctor' ? (
              <Stethoscope className="h-8 w-8 text-primary-600" />
            ) : (
              <ShoppingCart className="h-8 w-8 text-primary-600" />
            )}
            <h1 className="text-xl font-bold text-gray-900">
              {userType === 'doctor' ? 'Doctor Panel' : 'Pharmacy Panel'}
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-primary-100 text-primary-700 border-r-4 border-primary-600' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User type switcher */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-600 mb-2">Switch Panel:</p>
            <div className="flex space-x-2">
              <Link
                href="/doctor"
                className={`flex-1 text-center py-2 px-3 rounded text-sm font-medium transition-colors ${
                  userType === 'doctor' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Doctor
              </Link>
              <Link
                href="/pharmacy"
                className={`flex-1 text-center py-2 px-3 rounded text-sm font-medium transition-colors ${
                  userType === 'pharmacy' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Pharmacy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-1 lg:flex-none">
              <h2 className="text-lg font-semibold text-gray-900">
                Healthcare Admin Panel
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {userType === 'doctor' ? 'Doctor' : 'Pharmacy'} Dashboard
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout