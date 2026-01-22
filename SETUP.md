# JobZy Landing Page - Setup Instructions

## 📦 Install Dependencies

Run this command in your terminal to install all required packages:

```bash
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge
```

## 🚀 Run Development Server

After installing dependencies, start the dev server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main landing page (all sections)
│   └── globals.css         # Global styles
├── components/
│   ├── ui/
│   │   ├── button.tsx      # Button component (shadcn-style)
│   │   ├── card.tsx        # Card component
│   │   └── badge.tsx       # Badge component
│   └── landing/
│       ├── Hero.tsx        # Section 1: Hero
│       ├── SocialProof.tsx # Section 2: Trust indicators
│       ├── Problem.tsx     # Section 3: Pain points
│       ├── Solution.tsx    # Section 4: JobZy solution
│       ├── HowItWorks.tsx  # Section 5: 3-step guide
│       ├── BuilderStory.tsx # Section 6: Authentic story
│       ├── Features.tsx    # Section 7: Feature grid
│       ├── CTA.tsx         # Section 8: Final call-to-action
│       └── Footer.tsx      # Section 9: Footer
└── lib/
    └── utils.ts            # Utility functions (cn helper)
```

## ✨ Features Implemented

✅ **Hero Section** - Gradient background, animated headline, dual CTAs
✅ **Social Proof** - Target audience badges with icons
✅ **Problem Section** - 4 pain point cards with hover effects
✅ **Solution Section** - Features list + dashboard mockup
✅ **How It Works** - 3 numbered step cards with stagger animation
✅ **Builder Story** - Authentic, human-centered narrative
✅ **Features Grid** - 6 feature cards, responsive layout
✅ **Final CTA** - Email input + prominent button + trust indicators
✅ **Footer** - Clean, minimal with links

## 🎨 Design Features

- **Framer Motion animations** on all sections
- **Responsive design** - mobile-first approach
- **Smooth scrolling** behavior
- **Accessible** - respects prefers-reduced-motion
- **Modern gradients** and hover effects
- **Professional color palette** - Blue/Purple theme
- **SEO optimized** - proper metadata in layout.tsx

## 🛠️ Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **shadcn/ui inspired** components

## 📝 Notes

- All CTA buttons are functional (console.log for now)
- Email input is UI-only (no backend)
- No placeholder/lorem ipsum text
- Honest, authentic copy throughout
- Production-ready code quality
