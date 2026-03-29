# Rupal Hardware — Next.js Web Application

A full-stack B2B hardware distributor website built with Next.js 16, MongoDB, Cloudinary, and EmailJS. Features a public-facing storefront and a protected admin panel for managing products, projects, and customer enquiries.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | MongoDB Atlas + Mongoose |
| Image Hosting | Cloudinary |
| Email | EmailJS REST API |
| Auth | JWT (via cookies) |
| Notifications | react-hot-toast |

---

## Project Structure

```
rupal-hardware/
├── app/
│   ├── page.js                        # Homepage
│   ├── layout.js                      # Root layout (Navbar, Footer, BasketProvider)
│   ├── globals.css
│   ├── about/page.js                  # About page
│   ├── contact/page.js                # Contact form page
│   ├── enquiry/page.js                # Enquiry basket + form
│   ├── catalog/page.js                # Product catalog PDF viewer
│   ├── products/
│   │   ├── page.js                    # Products listing (fetches from DB)
│   │   └── [slug]/page.js             # Product detail page
│   ├── projects/
│   │   ├── page.js                    # Projects listing (fetches from DB)
│   │   └── [slug]/page.js             # Project detail / gallery page
│   ├── admin/
│   │   ├── layout.js                  # Admin layout (wraps AdminShell)
│   │   ├── page.js                    # Dashboard — stats + recent enquiries
│   │   ├── login/page.js              # Admin login
│   │   ├── enquiries/page.js          # Enquiries CRUD + status management
│   │   ├── products/page.js           # Products CRUD + Cloudinary upload
│   │   └── projects/page.js           # Projects CRUD + multi-image upload
│   └── api/
│       ├── contact/route.js           # POST — save contact form to DB
│       ├── send-email/route.js        # POST — EmailJS REST API proxy
│       ├── enquiries/
│       │   ├── route.js               # GET (admin) / POST (public)
│       │   ├── [id]/route.js          # GET / PATCH / DELETE
│       │   └── stats/route.js         # GET — dashboard counts
│       ├── products/
│       │   ├── route.js               # GET (public) / POST (admin)
│       │   └── [id]/route.js          # GET / PATCH / DELETE
│       ├── projects/
│       │   ├── route.js               # GET (public) / POST (admin)
│       │   └── [id]/route.js          # GET / PATCH / DELETE
│       ├── upload/route.js            # POST — Cloudinary image upload
│       └── admin/
│           ├── login/route.js         # POST — issue JWT cookie
│           └── logout/route.js        # POST — clear JWT cookie
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── ProductCard.jsx
│   ├── ProductCategories.jsx
│   ├── AddToBasketButton.js
│   ├── Distributor.jsx
│   ├── WhyChooseUs.jsx
│   ├── CTA.jsx
│   └── admin/
│       └── AdminShell.js              # Sidebar layout for admin panel
├── lib/
│   ├── db.js                          # MongoDB connection (cached)
│   ├── auth.js                        # JWT sign / verify / cookie helpers
│   ├── basket.js                      # React Context — enquiry basket
│   ├── products.js                    # Static product data (fallback)
│   ├── slugify.js                     # Auto slug generator
│   └── models/
│       ├── Enquiry.js                 # Mongoose schema — enquiries
│       ├── Product.js                 # Mongoose schema — products
│       └── Project.js                 # Mongoose schema — projects
├── templates/
│   ├── admin-notification.html        # EmailJS template — admin alert
│   └── user-confirmation.html         # EmailJS template — user receipt
├── public/
│   ├── prodimg/                       # Static product images
│   ├── kitchens/                      # Static project gallery images
│   ├── catalog/                       # Brand catalog images
│   ├── catalog-pdfs/                  # Downloadable MRP catalogs
│   ├── certificates/                  # GST + Udyam PDFs
│   └── homepage/                      # Hero section images
├── .env.local                         # Environment variables (never commit)
├── next.config.mjs
├── jsconfig.json
└── package.json
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd rupal-hardware
npm install
```

### 2. Configure environment variables

Copy `.env.local` and fill in all values:

```bash
cp .env.local .env.local
```

See the [Environment Variables](#environment-variables) section below for details.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Environment Variables

All variables live in `.env.local`. Never commit this file.

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/rupal-hardware

# Admin login credentials (used in /api/admin/login)
ADMIN_EMAIL=admin@rupalhardware.com
ADMIN_PASSWORD=your_secure_password

# JWT secret for signing admin session tokens
JWT_SECRET=your-long-random-secret

# Cloudinary — for product and project image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# EmailJS — server-side REST API (private key stays on server)
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
EMAILJS_PRIVATE_KEY=xxxxxxxxxxxxxxx

# EmailJS template IDs (safe to expose — just identifiers)
NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID=template_xxxxxxx
```

---

## Setting Up Services

### MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free cluster
2. Create a database user with read/write access
3. Whitelist your IP (or `0.0.0.0/0` for development)
4. Copy the connection string into `MONGODB_URI`

### Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → copy Cloud Name, API Key, API Secret
3. Images are uploaded to the `rupal-hardware/products` folder automatically

### EmailJS

1. Sign up at [emailjs.com](https://emailjs.com)
2. Create an **Email Service** (connect your Gmail or other provider)
3. Create **two Email Templates** using the HTML files in `/templates`:

**Template 1 — Admin Notification** (`admin-notification.html`)
- Paste the HTML into the template editor (HTML tab)
- Set "To Email" to your admin's email address (hardcoded)
- Subject: `New {{source}} from {{from_name}} — Rupal Hardware`
- Required variables: `from_name`, `phone`, `from_email`, `company`, `message`, `products`, `source`

**Template 2 — User Confirmation** (`user-confirmation.html`)
- Paste the HTML into the template editor (HTML tab)
- Set "To Email" to `{{to_email}}` (dynamic)
- Subject: `We received your enquiry — Rupal Hardware`
- Required variables: `to_name`, `to_email`, `phone`, `company`, `message`, `products`, `source`

4. Go to Account → API Keys → copy Public Key and Private Key

---

## Admin Panel

Access at `/admin/login`. Credentials are set via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`.

### Dashboard `/admin`
- Total, New, Contacted, and Closed enquiry counts
- Table of 5 most recent enquiries

### Enquiries `/admin/enquiries`
- View all submissions from both the Contact form and Enquiry Basket
- Search by name or phone
- Filter by status: New / Contacted / Closed
- Click any row to open a detail panel on the right
- Update status inline via dropdown or detail panel buttons
- Delete individual enquiries

### Products `/admin/products`
- Add, edit, delete products
- Slug is auto-generated from the product title
- Upload product image to Cloudinary
- Fields: Title, Brand, SKU, Category, Stock Status, Min Order, Description

### Projects `/admin/projects`
- Add, edit, delete kitchen projects
- Slug is auto-generated from the customer name
- Upload multiple images per project (all go to Cloudinary)
- Thumbnail strip preview in the card view
- Fields: Customer Name, Location, Testimonial, Images

---

## How Email Works

When a user submits the **Contact form** or **Enquiry Basket**:

1. The form data is saved to MongoDB via the API route
2. The frontend calls `/api/send-email` with a `templateId` and `templateParams`
3. `/api/send-email` calls the EmailJS REST API using the **private key** (server-side only — never exposed to the browser)
4. Two emails are sent:
   - **Admin notification** — goes to the admin's email with full submission details
   - **User confirmation** — goes to the user's email (only if they provided one)

---

## Data Models

### Enquiry
```js
{
  name: String,         // required
  phone: String,        // required
  email: String,
  company: String,
  message: String,
  products: Array,      // [{ slug, title }] from enquiry basket
  source: String,       // "contact" | "enquiry"
  status: String,       // "New" | "Contacted" | "Closed"
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```js
{
  slug: String,         // auto-generated from title, unique
  title: String,
  brand: String,
  category: String,     // Kitchen Accessories | Furniture Fittings | Adhesives | Sliding Systems | Lubricants
  sku: String,
  image: String,        // Cloudinary URL or local path
  description: String,
  minOrder: String,
  stockStatus: String,  // "In Stock" | "Limited Stock" | "Out of Stock"
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```js
{
  slug: String,         // auto-generated from customer name, unique
  customer: String,
  location: String,
  testimonial: String,
  images: [String],     // array of Cloudinary URLs
  createdAt: Date,
  updatedAt: Date
}
```

---

## Static Fallback Data

Both the Products and Projects pages fall back to static data (`lib/products.js` and inline arrays in the page files) if the database is empty or unreachable. This means the site works out of the box before you set up MongoDB.

Once you add records via the admin panel, the DB data takes over automatically.

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local` in the Vercel project settings
4. Deploy

Make sure to add your Vercel deployment URL to Cloudinary's allowed origins if needed.

### Build locally

```bash
npm run build
npm start
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```
