# Diego Caputi Portfolio — Pre-Launch Checklist

This document covers everything needed to take `portfolio/` from its current state to a live, production-ready personal portfolio.

**Deployment target:** GitHub Pages (free, no AWS needed)  
**Estimated time to complete:** 1–2 hours

---

## 1. Critical Placeholder Replacements

These must be done before the site goes live. Every item below is currently a non-functional placeholder.

### Contact Form (Formspree)
- [ ] Sign up at [formspree.io](https://formspree.io) (free tier: 50 submissions/month)
- [ ] Create a new form → copy the endpoint ID (format: `xpwzabcd`)
- [ ] In `index.html`, replace:
  ```
  action="https://formspree.io/f/YOUR_FORM_ID"
  ```
  with your real endpoint, e.g.:
  ```
  action="https://formspree.io/f/xpwzabcd"
  ```
- [ ] Test end-to-end: submit a test message, confirm email arrives

### Project Links
Replace all `href="#"` placeholders in the Projects section of `index.html`:

| Project | Link Type | Target |
|---|---|---|
| **CallVance** | DevPost | Your DevPost submission URL |
| **CallVance** | GitHub | `https://github.com/DCaputi001/callvance` |
| **CallVance** | Live Demo | Live URL if deployed (Netlify, Railway, Vercel) |
| **ShelfChef** | GitHub | `https://github.com/DCaputi001/shelfchef` |
| **Financial Planner** | GitHub | `https://github.com/DCaputi001/financial-planner` |
| **Payment Tracker** | GitHub | `https://github.com/DCaputi001/payment-tracker` |
| **Medify** | GitHub | `https://github.com/DCaputi001/medify` |

*(Adjust repository names to match your actual GitHub repo names)*

---

## 2. Resume PDF

- [ ] Export your resume as `resume.pdf`
  - Tools: Google Docs, Microsoft Word, or [Reactive Resume](https://rxresu.me) (free)
  - Recommended size: under 500KB
  - File name must be exactly `resume.pdf`
- [ ] Drop `resume.pdf` into the `portfolio/` folder
- [ ] This activates the "Resume ↓" button in the nav and the "Download PDF ↓" button on resume.html

---

## 3. GitHub Repository Setup & GitHub Pages Deploy

### Step 1 — Create the Repository
Option A (user site — gives you `diegocaputi001.github.io`):
```
GitHub → New repository
  Name: DCaputi001.github.io
  Visibility: Public
  Initialize with README: No
```

Option B (project site — gives you `diegocaputi001.github.io/portfolio`):
```
GitHub → New repository
  Name: portfolio
  Visibility: Public
```

- [ ] Choose Option A for a clean root URL (recommended)

### Step 2 — Initialize and Push
```bash
# From inside the portfolio/ folder:
git init
git add .
git commit -m "Initial portfolio launch"
git branch -M main
git remote add origin https://github.com/DCaputi001/DCaputi001.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
```
Repository → Settings → Pages
  Source: Deploy from a branch
  Branch: main
  Folder: / (root)
  → Save
```
- [ ] Wait 1–2 minutes for the initial build
- [ ] Verify site loads at `https://diegocaputi001.github.io`

### Step 4 — Future Updates
```bash
# After editing any file:
git add .
git commit -m "Update [what you changed]"
git push
# GitHub Pages auto-rebuilds on every push — no manual deploy needed
```

---

## 4. Custom Domain (Optional but Recommended)

A custom domain (`diegocaputi.com`) makes you look more professional to recruiters.

- [ ] Register `diegocaputi.com` at [Namecheap](https://namecheap.com) (~$12/year)
- [ ] In your domain registrar's DNS settings, add these records:
  ```
  A record:     @ → 185.199.108.153
  A record:     @ → 185.199.109.153
  A record:     @ → 185.199.110.153
  A record:     @ → 185.199.111.153
  CNAME record: www → DCaputi001.github.io
  ```
  *(These are GitHub Pages' IP addresses — they don't change)*
- [ ] In your GitHub repo: Settings → Pages → Custom domain → enter `diegocaputi.com` → Save
- [ ] Check "Enforce HTTPS" (appears after DNS propagates, usually within 1 hour)
- [ ] Create a file named `CNAME` in the repo root containing just: `diegocaputi.com`

---

## 5. Content & Contact Info

### Email
- [ ] Confirm `D.Caputi001@gmail.com` is correct in:
  - `index.html` contact section (mailto link + form error message)
  - `about.html` footer
  - `resume.html` footer
- [ ] Optional: update to a professional email once you have a domain

### LinkedIn
- [ ] Confirm `linkedin.com/in/diego-caputi` resolves (no numeric suffix)
  - To fix: LinkedIn → View Profile → Edit public profile URL → set to `diego-caputi`

---

## 6. Screenshots & Visual Assets Needed

Add screenshots to `portfolio/assets/images/`. These can be referenced in project cards when you add `<img>` tags.

### Per Project (5 projects × 2 screenshots = 10 total)

| Project | Screenshot 1 | Screenshot 2 |
|---|---|---|
| **CallVance** | Main dashboard at 1440px | Real-time call confirmation screen or WebSocket event log |
| **ShelfChef** | Pantry list screen (Android) | Recipe generation result screen |
| **Financial Planner** | Dashboard with role-based UI | MFA setup / TOTP prompt screen |
| **Payment Tracker** | Transaction table with filters | Financial summary card row |
| **Medify** | Medication schedule view | CSV export or schedule editor |

**Screenshot specs:**
- Desktop apps: 1440×900px, PNG or WebP
- Android apps: phone screenshot at native resolution, or use Android Studio's emulator
- Compress before adding: [squoosh.app](https://squoosh.app) or [tinypng.com](https://tinypng.com)

### Optional: Profile Photo
- [ ] If you want to add a headshot to the About page:
  - 400×400px, square crop, professional photo
  - Add to `portfolio/assets/images/diego.jpg`
  - Then add an `<img>` tag in `about.html`

---

## 7. GitHub Repository Clean-Up

Before the repo is public, make sure you're not accidentally sharing anything sensitive:

- [ ] Confirm no API keys, `.env` files, or credentials are in the folder
  - This is a pure static site (HTML/CSS/JS) — there should be nothing sensitive
- [ ] Consider adding a `.gitignore`:
  ```
  .DS_Store
  Thumbs.db
  *.log
  ```
- [ ] Add a short `README.md` to the repo describing what it is:
  ```markdown
  # Diego Caputi — Personal Portfolio
  Static portfolio site. Live at: https://diegocaputi001.github.io
  ```

---

## 8. Pre-Launch Quality Checks

- [ ] Open `index.html` locally in Chrome — no broken layouts, no console errors
- [ ] Open `about.html` locally — skills section uses dark teal theme (not cream)
- [ ] Open `resume.html` locally — timeline, education cards, award cards all render correctly
- [ ] Test mobile at 390px width — hamburger nav works, all grids collapse to 1 column
- [ ] Click "Work With Me" → scrolls to #contact
- [ ] Click "View Projects" → scrolls to #projects
- [ ] Nav links between pages work: Home → About → Experience → back
- [ ] "Hire Me" on about.html and resume.html → navigates to `index.html#contact`
- [ ] All project links go to real URLs (not `#`)
- [ ] Contact form submits successfully — receive test email in inbox
- [ ] "Download PDF ↓" prompts a file download (requires `resume.pdf` in folder)
- [ ] Footer email address is correct

---

## 9. Post-Launch

- [ ] Add portfolio URL to your GitHub profile (`github.com/DCaputi001` → Edit profile → Website)
- [ ] Add portfolio URL to your LinkedIn profile (Introduction section → Website)
- [ ] Add portfolio URL to your resume PDF
- [ ] Share on LinkedIn: "Just launched my portfolio — [link]"
- [ ] Cross-link to the business site: add a subtle "Consulting: caputidigital.com" line in the portfolio footer or contact section once both are live

---

## Summary — Launch-Critical vs. Nice-to-Have

| Item | Priority |
|---|---|
| Replace `YOUR_FORM_ID` (Formspree) | **CRITICAL** |
| Replace all `href="#"` project links | **CRITICAL** |
| Add `resume.pdf` | **CRITICAL** |
| GitHub repo setup + Pages deploy | **CRITICAL** |
| Custom domain (`diegocaputi.com`) | High |
| Screenshots / project images | Medium |
| Profile photo | Low |
| Cross-link to business site | Low (after both sites live) |
