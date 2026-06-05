# Vidhya Tech Website - Full Stack Setup Guide

## 📋 Prerequisites

- Node.js 18+ and npm
- Git account
- Vercel account (free)
- Railway account (free)

## 🚀 Quick Start

### Step 1: Clone and Setup

```bash
# Navigate to project
cd vidhya-tech

# Install dependencies
npm install

# Setup Prisma
npx prisma init
```

### Step 2: Database Setup

**Option A: Local Development (Using Prisma Postgres)**

```bash
npx prisma dev
```

**Option B: Connect to Railway PostgreSQL**

1. Go to https://railway.app
2. Create new project → Add PostgreSQL
3. Copy the database URL
4. Add to `.env`:
```
DATABASE_URL="your_railway_database_url"
```

### Step 3: Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### Step 4: Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## 📁 Project Structure

```
vidhya-tech/
├── app/
│   ├── api/               # API routes (backend)
│   │   ├── contact/       # Contact form handler
│   │   ├── services/      # Service CRUD operations
│   │   └── portfolio/     # Portfolio CRUD operations
│   ├── services/          # Services page
│   ├── portfolio/         # Portfolio page
│   ├── contact/           # Contact page
│   ├── admin/             # Admin dashboard
│   └── components/        # Reusable components
├── lib/
│   └── prisma.ts          # Prisma client setup
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static files
└── package.json           # Dependencies
```

## 🗄️ Database Tables

- **Services**: Website services
- **Portfolio**: Project showcase
- **Contact**: Form submissions
- **Team Members**: Team info
- **Settings**: Site configuration

## 🌐 Deployment Guide

### Deploy Frontend to Vercel

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/vidhya-tech.git
git push -u origin main
```

2. Go to https://vercel.com
3. Click "New Project" → Connect GitHub
4. Select repository
5. Add environment variable:
   - `DATABASE_URL`: Your Railway database URL
   - `NEXT_PUBLIC_SITE_URL`: `https://www.vidhyatech.com`
6. Deploy!

### Deploy Backend to Railway

Since we're using Next.js API routes, the backend deploys with frontend to Vercel. However, to use Railway for the database:

1. Create PostgreSQL database on Railway
2. Copy connection string
3. Add to Vercel environment variables
4. Redeploy

## 🔧 Configuration

### Environment Variables (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Public site URL for metadata, canonical links, and sitemap generation
NEXT_PUBLIC_SITE_URL="https://www.vidhyatech.com"

# Optional - for production
NODE_ENV="production"
```

### Update Website Content

Edit these files to customize:

- `app/page.tsx` - Home page
- `app/components/Header.tsx` - Navigation
- `app/components/Footer.tsx` - Footer info
- `prisma/schema.prisma` - Database structure

## 🖼️ Adding Content via Admin Panel

1. Go to /admin
2. View/delete services, portfolio items, and messages
3. API routes handle create/update/delete operations

## 📝 API Endpoints

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services` - Update service
- `DELETE /api/services` - Delete service

### Portfolio
- `GET /api/portfolio` - Get all projects
- `POST /api/portfolio` - Create project
- `PUT /api/portfolio` - Update project
- `DELETE /api/portfolio` - Delete project

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages

## 🎨 Customization

### Change Colors/Brand
Edit Tailwind classes in:
- `app/page.tsx`
- `app/services/page.tsx`
- `app/portfolio/page.tsx`
- `app/contact/page.tsx`
- `app/components/Header.tsx`
- `app/components/Footer.tsx`

### Add Images
1. Add images to `public/images/`
2. Reference in components: `<img src="/images/filename.jpg" />`

## 🚨 Troubleshooting

**Database connection error?**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify connection string format

**Pages not loading?**
- Clear browser cache
- Run: `npm run build && npm run dev`
- Check terminal for errors

**API errors?**
- Check browser console for errors
- Verify database migrations ran
- Check Prisma schema

## 📞 Support

For issues or questions, check the API routes in `app/api/` and Prisma documentation at https://pris.ly/d/prisma-schema

---

Happy building! 🎉
