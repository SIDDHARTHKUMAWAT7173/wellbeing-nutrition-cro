# Wellbeing Nutrition — Korean Marine Collagen Peptides Storefront

> **Inter IIT Product Management & Conversion Rate Optimization (CRO) Assignment**  
> A high-fidelity, high-converting D2C product page recreation and optimization based on Wellbeing Nutrition.

---

## 📌 Project Overview

This repository contains a production-ready, high-converting frontend recreation of the **Pure Korean Marine Collagen Peptides** storefront from [Wellbeing Nutrition](https://wellbeingnutrition.com).

The project was developed as a Product Management and Conversion Rate Optimization assignment. It identifies critical conversion bottlenecks in the original D2C e-commerce user journey and introduces data-informed CRO enhancements designed to reduce buyer friction, improve information architecture, reinforce trust, and increase Add-to-Cart / Checkout intent.

* **Original Reference Product Page:** [Wellbeing Nutrition Korean Marine Collagen Peptides](https://wellbeingnutrition.com/products/korean-marine-collagen-peptides?variant=40790287614032)
* **Live Deployment URL:** [https://wellbeing-nutrition-cro.vercel.app/](https://wellbeing-nutrition-cro.vercel.app/)

---

## 🎯 Assignment Objectives & Hypotheses

1. **Reduce Above-the-Fold Cognitive Load:** Present critical value propositions, clear pricing tiers, and immediate trust markers without forcing customers into cognitive exhaustion.
2. **Eliminate Purchase Friction:** Implement an intuitive pack-selector, transparent volume savings, and a persistent purchase pathway across mobile and desktop.
3. **Elevate Information Scent & Scannability:** Streamline dense scientific and regulatory information into dedicated, header-aware navigation targets.
4. **Reinforce Trust & Pescatarian Cleanliness:** Highlight clinical trials, heavy metal screening, purity certs, and clear usage guides to overcome buyer hesitation.

---

## 🚀 CRO Enhancements Implemented

### 1. Re-architected Product Information Navigation
* **Relocated Navigation Grid:** Moved the product information navigation from the right purchase column to the empty space directly beneath the product gallery and vertical thumbnails in the left column.
* **Streamlined 5-Box Grid:** Removed the redundant description box and refined navigation into 5 high-intent anchors:
  1. *Ingredients* (`#ingredientsAnchor`)
  2. *How to Take* (`#howToTakeAnchor`)
  3. *FAQ* (`#faqsSection`)
  4. *Lab Reports* (`#labReportsAnchor`)
  5. *Clinical Studies* (`#clinicalStudiesAnchor`)
* **Header-Aware Smooth Scrolling:** Built an offset calculation into `smoothScrollTo` that prevents the 70px sticky header from obscuring section headings when navigating.

### 2. Left-Column Purchase Benefits Bar
* **Relocated Trust Perks:** Moved the three key delivery and guarantee perks (🚚 *Free Shipping Across India*, 💵 *Cash on Delivery Available*, 🔄 *7-Day Replacement Guarantee*) from underneath the purchase buttons to a cohesive, balanced strip beneath the navigation boxes in the left column.
* **Desktop & Mobile Alignment:** Formatted into an evenly spaced 3-column row on desktop with icons aligned beside labels, and a centered stack on mobile that fits without text overflow.

### 3. Balanced Ingredients & Additional Information Section
* **Compact Korean Marine Collagen Card:** Reworked the left card so that origin, title, clinical description, and low-molecular-weight bullets sit prominently near the top, eliminating unnecessary empty space.
* **Bottom-Right Marine Illustration:** Encapsulated the collagen artwork into a dedicated bottom-right frame (`max-height: 110px`), ensuring the illustration is visible without pushing critical text down.
* **Aligned Two-Column Grid:** Desktop layout maintains equal column alignment between the left ingredients card and the right 9-row regulatory specifications table.

### 4. Prominent "HOW TO TAKE" Section Heading
* Added a clear, bold **HOW TO TAKE** section heading (`.section-main-heading`) with a **Usage Guide** eyebrow (`.section-eyebrow`), fully matching the font family, weight (700), size (32px desktop / 26px mobile), and alignment of the FAQ and Lab Reports sections.
* Clicking "How to Take" navigates directly to this heading and automatically expands the guide accordion.

### 5. Floating Back-to-Top Button
* Added a circular floating action button (`#backToTopBtn`) in the bottom-right corner with a crisp upward chevron.
* Fades in when scrolling past 400px; clicking it smoothly animates the viewport back to the top.
* Positioned at `bottom: 80px` on both desktop and mobile, ensuring zero overlap with the sticky purchase bar or the floating AI assistant. Accessible via keyboard (`Enter`/`Space`) with `aria-label="Back to top"`.

### 6. Value-Driven Pricing & Multi-Pack Selector
* **Visual 35% Wrinkle Reduction Banner:** Prominent value callout positioned directly beneath the rating score.
* **Pack Selection Cards:** Seamlessly toggle between Pack of 1, 2, 3, and 4 with instant feedback for pricing, compare-at MRP, percentage discount, and Member Price savings.
* **Synchronized Gallery:** Switching packs automatically changes the primary product hero image to the corresponding multi-pack render.

### 7. Persistent Sticky Purchase Bars
* **Desktop Sticky Bar:** Slides up from the bottom when scrolling past the main buy box, offering instant pack switching and direct Add to Cart / Buy It Now triggers.
* **Mobile Sticky Bar:** Minimalist bottom bar displaying the selected pack, price, and CTA.

### 8. Real AI-Powered "Ask Wellbeing" Assistant
* **AI Architecture:** Upgraded from a static lookup dictionary to a real, open-ended conversational AI powered by **OpenAI `gpt-4o-mini`** via a secure serverless backend endpoint (`/api/chat`).
* **Accurate Product Grounding:** Grounded strictly in verified product details (pure marine collagen sourcing from Korea, 8,000mg/serving, Type 1 & 3 peptides, <1000 Daltons molecular weight, 4 pack sizes & savings, directions for use, clinical studies, third-party lab screening for heavy metals/pathogens, and dietary compatibility).
* **Multi-Turn Context:** Retains conversational history across the user's active session, allowing natural follow-up questions (e.g. asking "How long to see results?" followed by "Can I take it with morning coffee?").
* **Safe Rendering & Error Recovery:** Formats responses cleanly with bold text and bullet lists while preventing XSS risks. Includes automatic error detection (e.g. missing API key, rate limits) and a single-click "Try Again" retry action.
* **Security & Credential Protection:** The OpenAI API key is read exclusively from the server-side `OPENAI_API_KEY` environment variable in Vercel. No keys or credentials are ever exposed in client-side code, HTML, or Git commits.

---

## 🛠️ Technology Stack

* **Frontend Markup:** Semantic HTML5 (`index.html`)
* **Styling:** Modern Vanilla CSS3
  * CSS Custom Properties (Theme tokens for primary teal, neutrals, alerts)
  * CSS Grid & Flexbox layouts
  * Responsive media queries (Desktop, Tablet, Mobile)
* **Client Scripting:** Modern Vanilla JavaScript (ES6+ IIFE)
  * Zero external JavaScript framework dependencies
  * Ultra-fast load times and zero hydration delays
* **Backend / Serverless:** Vercel Serverless Functions (`/api/chat.js`)
  * Node.js runtime (>= 18.0.0) with native Web `fetch`
  * Zero heavy npm runtime dependencies
  * Built-in per-IP rate limiting and request payload sanitization
* **AI Intelligence:** OpenAI `gpt-4o-mini`
  * System prompt grounded in accurate product formulation, clinical evidence, and safety testing
  * Conversation history tracking for contextual multi-turn dialogue
* **Typography:** Google Fonts (`Inter` & `Playfair Display`)
* **Asset Optimization:** WebP & JPG compressed image assets housed locally in `/images`

---

## 💻 Local Installation & Execution

Because the project uses standard web technologies without heavy dependencies or build scripts, running it locally is straightforward:

### Method 1: Direct File Opening
Double-click `index.html` in your file explorer, or right-click and choose **Open with > Chrome / Edge / Firefox / Safari**.

### Method 2: Local Python Server (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 3000
```
Open your browser and navigate to: `http://localhost:3000`

### Method 3: Node.js / npx
```bash
npx serve .
```

---

## 🧪 Testing Performed

Automated end-to-end tests were conducted via Playwright across both Desktop and Mobile viewports:

| Viewport | Dimensions | Checks Performed | Result |
| :--- | :--- | :--- | :---: |
| **Desktop** | 1280 × 800 | Navigation position, 5-box count, smooth scrolling with header offset, ingredients 2-col alignment, card compactness, benefits placement, back-to-top trigger and scroll, pack selector state sync, quantity stepper, cart modal, sticky desktop bar, AI widget, zero horizontal overflow. | **PASS** |
| **Mobile** | 375 × 667 | Responsive navigation layout, benefit row wrapping, ingredients card stacking above specs, mobile sticky bar clearance, back-to-top separation, no horizontal scroll clipping (`scrollWidth == clientWidth`). | **PASS** |

---

## ⚠️ Known Limitations & Demo Scope

1. **Client-Side Simulation:** Add to Cart, Buy It Now, and Cart Drawer actions trigger interactive prototype feedback modals rather than connecting to live Shopify payment gateways.
2. **Live AI Environment Variable Requirement:** The serverless AI endpoint (`/api/chat`) communicates directly with the official OpenAI API (`gpt-4o-mini`). In order for live AI answers to generate on production, the project administrator must configure the `OPENAI_API_KEY` secret variable in the Vercel dashboard.

---

## 🔑 AI Chatbot Setup & Environment Variables

To activate live conversational answers from OpenAI in your Vercel deployment:

1. Obtain an API key from [OpenAI Platform](https://platform.openai.com/api-keys).
2. Go to your project dashboard on [Vercel](https://vercel.com).
3. Navigate to **Settings > Environment Variables**.
4. Create a new variable:
   * **Key:** `OPENAI_API_KEY`
   * **Value:** `sk-...` (your secret OpenAI key)
   * **Environments:** Check *Production*, *Preview*, and *Development*.
5. Save the variable. The next deployment will immediately use this key to generate live responses.

*(Note: A template file `.env.example` is provided in the repository for reference. Never commit a real `.env` file or API key into version control).*

---

## 🌐 Deployment to Vercel

The project is structured as a zero-config repository ready for automatic Vercel deployment:

### Option A: Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account (see instructions below).
2. Go to [Vercel](https://vercel.com) and log in.
3. Click **Add New > Project** and select your GitHub repository.
4. Keep the default settings:
   * **Framework Preset:** *Other*
   * **Root Directory:** `./`
   * **Build Command:** *(None)*
   * **Output Directory:** *(None / root)*
5. Under **Environment Variables**, add `OPENAI_API_KEY` with your OpenAI key.
6. Click **Deploy**. Vercel will build and assign a live production URL in seconds.

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel env add OPENAI_API_KEY
vercel --prod
```

---

## 📄 License & Attribution

This project is created strictly for academic and demonstration purposes as part of the Inter IIT Product Management / CRO assignment. All product imagery, trademarks, and nutritional data belong to [Wellbeing Nutrition](https://wellbeingnutrition.com).
