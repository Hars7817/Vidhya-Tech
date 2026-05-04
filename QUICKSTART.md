# 🚀 Vidhya Tech - Complete Step-by-Step Guide

## ✅ What's Already Done

Your website is fully built with:
- ✅ Beautiful Home page with hero section
- ✅ Services page with service listings
- ✅ Portfolio page with projects
- ✅ Contact form connected to database
- ✅ Admin panel to manage content
- ✅ Backend API routes
- ✅ PostgreSQL database with Prisma

---

## 📋 Part 1: Local Development Setup (For Testing)

### Step 1: Navigate to Project
```bash
cd c:\Users\harsh\OneDrive\New\ folder\vidhya-tech
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Visit Website
Open browser: **http://localhost:3000**

You'll see:
- Home page at `/`
- Services at `/services`
- Portfolio at `/portfolio`
- Contact form at `/contact`
- Admin panel at `/admin`

---

## 🗄️ Part 2: Setup Database (Choose One)

### Option A: Local Development (Easiest for Testing)

The database URL is already in `.env` with a Prisma Postgres instance.

**Create tables:**
```bash
npx prisma migrate dev --name init
```

**View database UI:**
```bash
npx prisma studio
```

Then go to http://localhost:5555 to add services and portfolios manually.

---

### Option B: Railway PostgreSQL (For Production)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up (free)

2. **Create PostgreSQL Database**
   - Click "New Project"
   - Select "Add from Template"
   - Choose "PostgreSQL"
   - Wait for database to initialize

3. **Get Connection String**
   - In Railway project, click PostgreSQL
   - Go to "Connect" tab
   - Copy the full connection string that looks like:
   ```
   postgresql://user:password@host:port/database
   ```

4. **Update .env file**
   - Open `.env` in vidhya-tech folder
   - Replace DATABASE_URL with Railway connection string:
   ```env
   DATABASE_URL="postgresql://user:password@railway-host:port/railway"
   ```

5. **Create Tables on Railway**
   ```bash
   npx prisma migrate deploy
   ```

---

## 🎨 Part 3: Customize Your Website

### Change Company Name
Edit `app/components/Header.tsx` (line 14):
```tsx
<Link href="/" className="text-2xl font-bold text-blue-600">
  YOUR_COMPANY_NAME  {/* Change here */}
</Link>
```

### Update Contact Information
Edit `app/components/Footer.tsx` (lines 24-27):
```tsx
<p className="text-gray-400">Email: your_email@company.com</p>
<p className="text-gray-400">Phone: +91-XXXXXXXXXX</p>
<p className="text-gray-400">Address: Your Address</p>
```

### Update Hero Section
Edit `app/page.tsx` (lines 9-12):
```tsx
<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
  Welcome to <span className="text-blue-600">YOUR_COMPANY</span>
</h1>
<p className="text-xl text-gray-700 mb-8">
  Your custom description here
</p>
```

### Change Colors
All pages use Tailwind classes like:
- `bg-blue-600` → Blue buttons and headers
- `text-blue-600` → Blue text links

To change color scheme, replace all occurrences:
- Find: `blue-600` Replace with: `green-600` (or any Tailwind color)
- Find: `indigo` Replace with: `purple` (or any Tailwind color)

### Add Content to Database

**Using Prisma Studio:**
```bash
npx prisma studio
```

Click "+ Create" buttons to add:
- **Services** (title, description, order)
- **Portfolio** (title, description, category, link, order)

---

## 🌐 Part 4: Deploy to Vercel (FREE)

### Step 1: Create GitHub Account
1. Go to https://github.com/signup
2. Create account (free)
3. Verify email

### Step 2: Push Code to GitHub

```bash
cd c:\Users\harsh\OneDrive\New\ folder\vidhya-tech

# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial Vidhya Tech website"

# Create repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/vidhya-tech.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to https://vercel.com
2. Click "Sign Up" (choose GitHub)
3. Authorize Vercel to access GitHub
4. Click "New Project"
5. Select "vidhya-tech" repository
6. Vercel will auto-detect it's a Next.js project

**Add Environment Variable:**
- Click "Environment Variables"
- Add `DATABASE_URL` = Your Railway connection string
- Click Deploy

**Done!** Your site is live at `https://your-project-name.vercel.app`

---

## 🗄️ Part 5: Connect Database to Vercel

After deploying to Vercel:

### Step 1: Get Railway Database URL
- Go to Railway: https://railway.app
- Click your PostgreSQL database
- Copy connection string

### Step 2: Add to Vercel
- Go to Vercel Project Settings
- Click "Environment Variables"
- Add `DATABASE_URL` = paste Railway connection string
- Click "Save"
- Redeploy project (it will auto-redeploy)

### Step 3: Verify Database is Connected
```bash
# From local machine, run migrations on Railway database:
DATABASE_URL="your_railway_url" npx prisma migrate deploy
```

---

## ✉️ Part 6: Configure Email Notifications (Optional)

To get email when someone submits contact form:

1. Install Nodemailer:
```bash
npm install nodemailer
```

2. Edit `app/api/contact/route.ts` to add email sending
3. Add `SMTP_EMAIL`, `SMTP_PASSWORD` to environment variables

*(For now, messages are saved in database and visible in /admin)*

---

## 🎯 Part 7: Add Custom Domain (Optional)

### Use Vercel Domain
- Your site: `yourproject.vercel.app` (free)

### Use Custom Domain
1. Buy domain from GoDaddy, Namecheap, etc.
2. In Vercel: Project Settings → Domains
3. Add your domain
4. Update DNS settings as shown by Vercel

---

## 📝 Part 8: Add Services/Portfolio Content

### Method 1: Prisma Studio (Easiest)
```bash
npx prisma studio
```
- Click "Create" button
- Fill in title, description, etc.
- Data appears on website instantly

### Method 2: Direct Database Query
```sql
-- Add a service
INSERT INTO services (title, description, "order", "createdAt", "updatedAt") 
VALUES ('Web Development', 'Custom websites...', 1, NOW(), NOW());

-- Add a portfolio item
INSERT INTO portfolios (title, description, category, "order", image, "createdAt", "updatedAt") 
VALUES ('E-Commerce Site', 'Built for...', 'Web Development', 1, '', NOW(), NOW());
```

### Method 3: API Routes (For Developers)
```bash
# Add service via API
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{"title":"Web Dev","description":"Custom sites","order":1}'
```

---

## 🛠️ Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Check `DATABASE_URL` is correct in `.env`
- Check PostgreSQL is running
- Test connection: `npx prisma db execute --stdin`

### Issue: "npm start doesn't work"
**Solution:**
```bash
npm run build
npm run start
```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
npm run dev -- -p 3001
```

### Issue: "Changes not showing on Vercel"
**Solution:**
1. Make changes locally
2. Commit: `git add . && git commit -m "Updates"`
3. Push: `git push origin main`
4. Vercel auto-deploys

---

## 📊 Check Admin Panel

Your admin panel at `/admin` shows:
- **Contact Messages** - All form submissions
- **Services** - Manage services
- **Portfolio** - Manage projects

---

## 🔐 Security Tips

1. **Never commit .env** - Already in .gitignore ✅
2. **Use strong passwords** - For Railway account
3. **Enable 2FA** - On GitHub and Vercel
4. **Add authentication** - For /admin panel (optional)

---

## 📞 Next Steps

### To Go Live:
1. ✅ Customize content (company name, descriptions)
2. ✅ Deploy to Vercel
3. ✅ Connect Railway database
4. ✅ Add services and portfolio items
5. ✅ Test contact form
6. ✅ Set custom domain (optional)

### To Keep Improving:
- [ ] Add image uploads
- [ ] Add email notifications
- [ ] Add authentication for admin
- [ ] Add blog section
- [ ] Add analytics

---

## 📚 Useful Resources

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Tailwind CSS: https://tailwindcss.com/docs

---

## 🎉 Summary

Your Vidhya Tech website is:
✅ **Fully Built** - All pages ready
✅ **Database Connected** - PostgreSQL with Prisma
✅ **Ready to Deploy** - One click to Vercel
✅ **Admin Panel** - Manage all content
✅ **Contact Enabled** - Saves messages to database
✅ **Free Hosting** - Vercel + Railway free tiers

**Total Cost: $0 (Free Forever)**

Good luck launching your agency! 🚀
