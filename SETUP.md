# Healthcare Admin Panel - Complete Setup Guide

This guide will walk you through setting up the Healthcare Admin Panel from scratch.

## 🚀 Quick Start

### Step 1: Initialize the Project

```bash
# Create a new Next.js project
npx create-next-app@latest healthcare-admin-panel --typescript --tailwind --eslint --app=false --src-dir=false

# Navigate to project directory
cd healthcare-admin-panel
```

### Step 2: Install Dependencies

```bash
# Install required packages
npm install axios react-hook-form react-hot-toast lucide-react

# Install dev dependencies (if not already installed)
npm install -D @types/node @types/react @types/react-dom
```

### Step 3: Project Structure Setup

Create the following directory structure:

```
healthcare-admin-panel/
├── components/
├── lib/
├── pages/
│   ├── doctor/
│   └── pharmacy/
├── styles/
└── public/
```

### Step 4: Configuration Files

1. **Replace `package.json`** with the provided version
2. **Create/Update configuration files**:
   - `tailwind.config.js`
   - `next.config.js`
   - `postcss.config.js`
   - `tsconfig.json`

### Step 5: Environment Setup

```bash
# Copy environment example
cp .env.local.example .env.local

# Edit .env.local with your API URLs if different
```

### Step 6: Add Source Files

Copy all the provided source files to their respective locations:

#### Core Files
- `pages/_app.tsx` - Main app wrapper
- `pages/_document.tsx` - Document structure
- `styles/globals.css` - Global styles
- `lib/api.ts` - API utilities and types

#### Components
- `components/Layout.tsx` - Main layout component

#### Pages
- `pages/index.tsx` - Home page
- `pages/doctor/index.tsx` - Doctor dashboard
- `pages/doctor/add-patient.tsx` - Add patient form
- `pages/doctor/add-record.tsx` - Add health record form
- `pages/pharmacy/index.tsx` - Pharmacy dashboard
- `pages/pharmacy/add-inventory.tsx` - Add inventory form
- `pages/pharmacy/medicines.tsx` - Medicines catalog

### Step 7: Run the Application

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## 🔧 Detailed Setup Instructions

### 1. API Configuration

The application is configured to work with two APIs:

**Pharmacy API**: `http://15.206.75.63:8000`
- Handles medicine catalog and inventory management

**Doctor API**: `http://192.168.0.100:8000`  
- Handles patient and health record management

### 2. CORS and Proxy Setup

The `next.config.js` includes proxy configuration to handle API calls. If you encounter CORS issues:

1. **Option A**: Use the built-in proxy (recommended)
   - API calls will be made to `/api/pharmacy/*` and `/api/doctor/*`
   - Next.js will proxy them to the respective backend servers

2. **Option B**: Direct API calls
   - Remove the rewrites from `next.config.js`
   - Update API base URLs in `lib/api.ts`
   - Ensure backend servers have proper CORS headers

### 3. Customization Options

#### Change API URLs
Update the base URLs in `lib/api.ts`:

```typescript
export const pharmacyAPI = axios.create({
  baseURL: 'http://your-pharmacy-api-url',
  // ...
})

export const doctorAPI = axios.create({
  baseURL: 'http://your-doctor-api-url', 
  // ...
})
```

#### Styling Customization
- Modify `tailwind.config.js` for custom colors and themes
- Update `styles/globals.css` for global style changes
- Component styles can be customized directly in the component files

#### Add Authentication
To add authentication:

1. Install auth library (e.g., NextAuth.js)
2. Add auth middleware to `pages/_app.tsx`
3. Protect routes in the Layout component
4. Add login/logout functionality

## 🐛 Troubleshooting

### Common Issues

#### 1. API Connection Issues
```bash
# Check if APIs are accessible
curl http://15.206.75.63:8000/api/medicines
curl http://192.168.0.100:8000/api/patients
```

#### 2. CORS Errors
- Ensure your backend APIs have proper CORS configuration
- Use the proxy configuration in `next.config.js`
- Check browser network tab for actual error details

#### 3. TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart development server
npm run dev
```

#### 4. Styling Issues
- Ensure Tailwind CSS is properly installed
- Check that `styles/globals.css` is imported in `_app.tsx`
- Verify Tailwind configuration is correct

### Environment-Specific Issues

#### Development vs Production
- API URLs might differ between environments
- Use environment variables for configuration
- Ensure build process includes all necessary files

#### Network Access
- Backend APIs must be accessible from your development machine
- Check firewall settings if APIs are not responding
- Verify API endpoints are correct and working

## 📋 Testing the Setup

### 1. Basic Functionality Test
1. Navigate to `http://localhost:3000`
2. Click on "Doctor Panel" and "Pharmacy Panel"
3. Verify both dashboards load correctly

### 2. API Integration Test
1. Go to Pharmacy → View Medicines
2. Search should return results from the API
3. Go to Doctor → Add Patient
4. Fill out form and submit (will show success if API is working)

### 3. Form Validation Test
1. Try submitting forms with empty fields
2. Verify validation messages appear
3. Test with invalid data (wrong formats, etc.)

## 🚀 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Follow prompts to configure deployment
```

### Self-Hosted Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "healthcare-admin" -- start
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Axios Documentation](https://axios-http.com/docs/intro)

## 🆘 Getting Help

If you encounter issues:

1. Check the console for error messages
2. Verify API endpoints are accessible
3. Ensure all dependencies are installed correctly
4. Check the GitHub repository for known issues
5. Contact the development team for support

