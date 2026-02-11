# Admin Panel - Repair Shop Management System

A modern, responsive admin panel for managing a repair shop, built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features Implemented

### Core Pages (Based on Existing System Analysis)
- **Dashboard**: Overview with key metrics cards
- **Acceptances**:
  - Add Acceptance (P-001): Multi-section form with conditional fields
  - List Acceptances (P-003): Data table with search, filters, and actions
- **Sales**:
  - Add General Sale (P-007): Simple sale recording form
- **Inventory**:
  - Product Purchase (P-014): Dynamic product entry with invoice details
- **Reports**:
  - Khata Online (P-018): Financial dashboard with charts and summary table
  - Current Balance (P-024): Stock valuation summary

### Technical Features
- **Modern UI**: Clean, professional design with rounded corners and subtle shadows
- **Responsive Design**: Mobile-friendly sidebar and layouts
- **Form Validation**: React Hook Form with Zod schemas
- **Data Tables**: TanStack Table with sorting, filtering, and pagination
- **Charts**: Recharts for financial visualizations
- **TypeScript**: Full type safety
- **Dummy Data**: All pages populated with sample data for demonstration

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the admin panel.

## Project Structure

- `app/` - Next.js App Router pages
- `components/` - Reusable UI components
- `components/ui/` - shadcn/ui components
- `lib/` - Utility functions
- `requirements/` - Original system analysis and screenshots

## Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Table
- Recharts
- React Hook Form
- Zod
- Lucide Icons

## API Integration Ready

The application is designed with API integration in mind:
- All data fetching points are clearly marked
- Form submissions log data to console (replace with API calls)
- State management ready for TanStack Query
- TypeScript interfaces ready for API response types

## Navigation

The sidebar includes all main sections from the original system:
- Dashboard
- Acceptances (Add/List)
- Sales (Add General Sale)
- Inventory (Product Purchase)
- Reports (Khata Online, Current Balance)
- Settings

## Future Development

- Integrate with NestJS backend API
- Add authentication and authorization
- Implement real-time data updates
- Add more advanced reporting features
- Expand to all 43 pages from the requirements

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
