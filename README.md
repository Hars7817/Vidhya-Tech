# Vidhya Tech - Full Stack Website

A modern, responsive full-stack website for digital agency Vidhya Tech with:

- ✅ Beautiful responsive frontend (React + Next.js)
- ✅ Powerful backend API (Next.js API routes)
- ✅ PostgreSQL database with Prisma ORM
- ✅ Contact form with database storage
- ✅ Admin panel for content management
- ✅ Deployed on Vercel (frontend) & Railway (database)
- ✅ Free hosting solution

## 🚀 Live Features

### Public Pages
- **Home**: Hero section, features, services preview, CTA
- **Services**: Complete service offerings with descriptions
- **Portfolio**: Project showcase with categories
- **Contact**: Contact form that saves to database

### Admin Panel (/admin)
- View all contact submissions
- Manage services
- Manage portfolio projects
- Database-backed content management

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Next.js 16, Tailwind CSS |
| Backend | Node.js, Next.js API Routes |
| Database | PostgreSQL |
| ORM | Prisma |
| Hosting | Vercel (free tier) |
| Database Host | Railway (free tier) |
| Package Manager | npm |

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/vidhya-tech.git
cd vidhya-tech
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Edit `.env` with your database URL:
```
DATABASE_URL="postgresql://user:password@host:port/database"
```

### 4. Setup Database

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Optional: View database UI
npx prisma studio
```

### 5. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

### Add Services
Edit database via Prisma Studio:
```bash
npx prisma studio
```

Or use admin API endpoints. Services auto-populate on `/services` page.

### Add Portfolio Projects
Same as services - use Prisma Studio or API endpoints.

### View Contact Messages
Visit `/admin` to see all contact form submissions.

## 🚀 Deployment

### Deploy to Vercel (Frontend + Backend)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Add environment variable `DATABASE_URL`
   - Click Deploy

3. **Done!** Your site is live at `https://yourdomain.vercel.app`

### Database on Railway

1. **Create Railway Project**:
   - Go to [railway.app](https://railway.app)
   - New Project → Add PostgreSQL
   - Copy database connection string

2. **Add to Vercel**:
   - Go to Vercel Project Settings
   - Environment Variables
   - Add `DATABASE_URL` = Railway connection string
   - Redeploy

3. **Run Migrations on Railway**:
```bash
DATABASE_URL="your_railway_url" npx prisma migrate deploy
```

## 📂 Project Structure

```
vidhya-tech/
│
├── app/
│   ├── api/                    # Backend APIs
│   │   ├── contact/route.ts   # Contact form endpoint
│   │   ├── services/route.ts  # Services CRUD
│   │   └── portfolio/route.ts # Portfolio CRUD
│   │
│   ├── admin/                 # Admin dashboard
│   │   └── page.tsx
│   │
│   ├── components/            # Reusable components
│   │   ├── Header.tsx        # Navigation
│   │   └── Footer.tsx        # Footer
│   │
│   ├── services/              # Services page
│   │   └── page.tsx
│   │
│   ├── portfolio/             # Portfolio page
│   │   └── page.tsx
│   │
│   ├── contact/               # Contact page
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
│
├── lib/
│   └── prisma.ts              # Prisma client singleton
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
│
├── public/                    # Static files
│   └── images/
│
├── .env                       # Environment variables (local)
├── .env.example               # Environment template
├── package.json
├── tsconfig.json
├── next.config.ts
└── DEPLOYMENT_GUIDE.md        # Detailed deployment guide
```

## 🗄️ Database Schema

### Services Table
```
- id (primary key)
- title (string)
- description (text)
- icon (string)
- image (string)
- order (integer)
- createdAt, updatedAt (timestamps)
```

### Portfolio Table
```
- id (primary key)
- title (string)
- description (text)
- image (string)
- link (string)
- category (string)
- order (integer)
- createdAt, updatedAt (timestamps)
```

### Contact Table
```
- id (primary key)
- name (string)
- email (string)
- phone (string)
- message (text)
- read (boolean)
- createdAt (timestamp)
```

## 🎨 Customization Guide

### Change Company Name & Info
1. `app/components/Header.tsx` - Update logo/brand name
2. `app/components/Footer.tsx` - Update contact info
3. `app/page.tsx` - Update hero text
4. `.env` - Update site configuration

### Update Colors/Styling
- All components use Tailwind CSS utility classes
- Color scheme: Blue (`bg-blue-600`) and Indigo
- Edit Tailwind colors in components or `tailwind.config.ts`

### Add Company Logo
1. Save logo to `public/images/logo.png`
2. Update Header.tsx:
```tsx
<img src="/images/logo.png" alt="Vidhya Tech" className="h-10" />
```

### Update Social Links
Edit `app/components/Footer.tsx` social media links

## 🔗 API Endpoints

All endpoints are in `app/api/`:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get contact submissions |
| GET | `/api/services` | Get all services |
| POST | `/api/services` | Create service |
| PUT | `/api/services` | Update service |
| DELETE | `/api/services` | Delete service |
| GET | `/api/portfolio` | Get all projects |
| POST | `/api/portfolio` | Create project |
| PUT | `/api/portfolio` | Update project |
| DELETE | `/api/portfolio` | Delete project |

## 🐛 Troubleshooting

### "Cannot find module" Error
```bash
npm install
npm run dev
```

### Database Connection Error
- Verify `DATABASE_URL` in `.env`
- Check PostgreSQL is running
- Test connection: `npx prisma db execute --stdin < /dev/null`

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Build Errors
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Railway Database](https://docs.railway.app)

## 📄 License

MIT License - feel free to use and modify

## 🤝 Support

For deployment questions, see `DEPLOYMENT_GUIDE.md`

---

**Built with ❤️ for Vidhya Tech**
