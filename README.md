# Healthcare Admin Panel

A comprehensive Next.js admin panel for healthcare management, designed for doctors and pharmacies to manage patient records, health data, and inventory.

## Features

### Doctor Panel
- **Patient Management**: Add new patients with comprehensive information
- **Health Records**: Create and manage digital health records linked to patients
- **FHIR Compliance**: Support for FHIR-compliant health data
- **Mobile-based Linking**: Link health records to patients using mobile numbers

### Pharmacy Panel
- **Inventory Management**: Add medicines to pharmacy inventory
- **Medicine Catalog**: Browse and search through available medicines
- **Stock Tracking**: Monitor stock quantities and pricing
- **Search Functionality**: Advanced search for medicines by name, manufacturer, or details

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## API Integration

The application integrates with two separate APIs:

### Pharmacy API (`http://15.206.75.63:8000`)
- `POST /api/inventory` - Add items to inventory
- `GET /api/medicines` - Retrieve medicines with search and pagination

### Doctor API (`http://192.168.0.100:8000`)
- `POST /api/patients` - Add new patients
- `POST /api/records` - Add health records

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Update the API URLs in `.env.local` if needed.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
healthcare-admin-panel/
├── pages/
│   ├── _app.tsx              # App wrapper
│   ├── _document.tsx         # Document structure
│   ├── index.tsx             # Home page
│   ├── doctor/
│   │   ├── index.tsx         # Doctor dashboard
│   │   ├── add-patient.tsx   # Add patient form
│   │   └── add-record.tsx    # Add health record form
│   └── pharmacy/
│       ├── index.tsx         # Pharmacy dashboard
│       ├── add-inventory.tsx # Add inventory form
│       └── medicines.tsx     # Medicines catalog
├── components/
│   └── Layout.tsx            # Main layout component
├── lib/
│   └── api.ts               # API utilities and types
├── styles/
│   └── globals.css          # Global styles
└── public/                  # Static assets
```

## Key Components

### Layout Component
- Responsive sidebar navigation
- Role-based navigation (Doctor/Pharmacy)
- Mobile-friendly design
- Quick panel switching

### API Layer
- Axios-based HTTP client
- TypeScript interfaces for all API models
- Error handling and response processing
- Separate service modules for each API

### Form Handling
- React Hook Form for form validation
- TypeScript form interfaces
- Real-time validation feedback
- Loading states and success messages

## API Models

### Doctor API Models
```typescript
interface Patient {
  id: string
  name: string
  dob: string
  mobile_number: string
  identifiers: string
  fhir: string
  // ... other fields
}

interface HealthRecord {
  id: string
  mobile_number: string
  resource_type: string
  data: string
  patient: string
  // ... other fields
}
```

### Pharmacy API Models
```typescript
interface Medicine {
  id: number
  name: string
  manufacturer: string
  details: string
  // ... other fields
}

interface InventoryItem {
  id: number
  pharmacy: Pharmacy
  medicine: Medicine
  stock_quantity: number
  price: string
  // ... other fields
}
```

## Features in Detail

### Search and Pagination
- Client-side and server-side search
- Pagination support for large datasets
- Loading states and error handling

### Form Validation
- Required field validation
- Pattern matching for phone numbers and UUIDs
- Custom validation rules
- User-friendly error messages

### Responsive Design
- Mobile-first approach
- Collapsible sidebar navigation
- Touch-friendly interface
- Consistent spacing and typography

### Error Handling
- API error handling with user-friendly messages
- Form validation errors
- Loading states for async operations
- Success notifications

## Usage Guide

### For Doctors
1. Navigate to the Doctor Panel from the home page
2. **Add Patient**: Fill out patient information including FHIR data
3. **Add Health Record**: Create health records linked to patients via mobile number

### For Pharmacies
1. Navigate to the Pharmacy Panel from the home page
2. **View Medicines**: Browse or search the medicine catalog
3. **Add Inventory**: Select medicines and add them to inventory with stock and pricing

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Consistent component structure
- Tailwind CSS for styling
- ESLint for code quality

## Security Considerations

- Form validation on both client and server
- Input sanitization
- HTTPS recommended for production
- Environment variables for sensitive configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository.