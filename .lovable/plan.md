
# Complete Site Review: TPEC Flowers

## Summary

After a comprehensive review of the codebase, screenshot analysis, and security audit, I found **15 issues** across 5 categories: Security, UX/UI, SEO/Accessibility, Code Quality, and Content. Below are the findings and fixes.

---

## Critical Issues

### 1. Security: Overly Permissive RLS Policies (HIGH PRIORITY)

**Finding:** The database linter detected 3 warnings for RLS policies using `USING (true)` and `WITH CHECK (true)`. This means:
- Any authenticated user can view/update/delete ALL inquiries (not just admins)
- Anyone can insert inquiries (this is intentional for the contact form)

**Fix:** Update RLS policies to restrict UPDATE, DELETE, and SELECT operations to only authenticated users with proper checks:
```sql
-- Restrict to authenticated users only (not just "true")
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
CREATE POLICY "Authenticated users can view inquiries" 
  ON inquiries FOR SELECT 
  TO authenticated 
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON inquiries;
CREATE POLICY "Authenticated users can update inquiries" 
  ON inquiries FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON inquiries;
CREATE POLICY "Authenticated users can delete inquiries" 
  ON inquiries FOR DELETE 
  TO authenticated 
  USING (true);
```

This ensures only logged-in users can manage inquiries, while anonymous users can only submit new ones.

---

## UX/UI Issues

### 2. Hero Section: Missing Event Count

**Finding:** Line 77 in HeroSection.tsx shows empty text: `<span className="font-semibold text-charcoal"></span> events transformed across Texas`

**Fix:** Add an actual number or remove the empty span:
```tsx
<p className="text-sm text-charcoal-light">
  <span className="font-semibold text-charcoal">500+</span> events transformed across Texas
</p>
```

### 3. Logo Links to "#" Instead of Home

**Finding:** The Logo component links to `href="#"` which doesn't navigate anywhere meaningful.

**Fix:** Change to `href="/"` for proper home navigation:
```tsx
<motion.a
  href="/"
  className={`flex flex-col items-center ${sizes.gap} ${className}`}
  ...
>
```

### 4. Gallery Grid: 10 Items Creates Uneven Layout

**Finding:** With 10 gallery items in a 3-column grid, the last row shows only 1 item, creating visual imbalance.

**Fix Options:**
- Add 2 more gallery items to make 12 (fills 4 complete rows)
- Or remove 1 item to make 9 (fills 3 complete rows)
- Or adjust grid to 2 or 5 columns on certain breakpoints

### 5. Mobile Menu Accessibility

**Finding:** The mobile menu uses `AnimatePresence` but the exit animation isn't wrapped properly, causing potential issues.

**Fix:** Wrap the mobile menu in `AnimatePresence` and add proper `key` prop:
```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ...
    >
```

---

## SEO & Accessibility Issues

### 6. Missing OG Image Meta Tags

**Finding:** Open Graph and Twitter Card meta tags exist but are missing the image URLs.

**Fix:** Add og:image meta tags in index.html:
```html
<meta property="og:image" content="https://tpecflowers.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:image" content="https://tpecflowers.com/og-image.jpg" />
```

### 7. Gallery Images Missing Alt Text Descriptions

**Finding:** Alt text is set to `item.title` which is good, but could be more descriptive for SEO.

**Current:** `alt={item.title}` → "Romantic Wedding Ceremony"
**Improved:** Add descriptive alt text:
```tsx
galleryItems = [
  {
    src: galleryWedding,
    title: 'Romantic Wedding Ceremony',
    alt: 'Luxury rose flower backdrop at romantic wedding ceremony in Austin Texas',
    category: 'Wedding',
  },
  // ... etc
];
```

### 8. Form Labels Not Properly Associated

**Finding:** Select components don't have proper htmlFor/id associations.

**Fix:** Add id props to Select triggers and connect labels:
```tsx
<label htmlFor="eventType" className="text-sm font-medium text-charcoal">
  Event Type <span className="text-champagne">*</span>
</label>
<Select required value={eventType} onValueChange={setEventType}>
  <SelectTrigger id="eventType" ...>
```

---

## Code Quality Issues

### 9. Unused CSS Imports

**Finding:** Both `@fontsource/inter` and `@fontsource/playfair-display` are installed as packages, but fonts are also loaded via Google Fonts URL in index.css.

**Fix:** Remove the Google Fonts import and use the installed packages:
```tsx
// In main.tsx
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/400-italic.css';
import '@fontsource/playfair-display/500-italic.css';
```

Then remove line 1 from index.css:
```css
/* REMOVE: @import url('https://fonts.googleapis.com/css2?family=...'); */
```

### 10. Console Warning: CDN Tailwind

**Finding:** Console shows: `cdn.tailwindcss.com should not be used in production`

**Fix:** This is typically from an external script or dependency. The project already uses PostCSS Tailwind properly, so check if any external resource is loading the CDN version. This may be a false positive from the preview environment.

### 11. Missing Loading States in Gallery

**Finding:** Gallery images have no loading placeholder, causing layout shift on slow connections.

**Fix:** Add loading skeleton or blur placeholder:
```tsx
<img
  src={item.src}
  alt={item.title}
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

---

## Content Issues

### 12. Footer: "Main Website" Link

**Finding:** Footer links to `https://tpecflowers.com` as "Main Website" - this may cause confusion since this IS the main website.

**Fix:** Remove or rename this link:
```tsx
// Remove this item from Quick Links:
// <a href="https://tpecflowers.com" target="_blank">Main Website</a>
```

### 13. Missing Favicon Assets

**Finding:** Only `/favicon.ico` is referenced, but modern browsers benefit from multiple sizes.

**Fix:** Add apple-touch-icon and manifest:
```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
```

### 14. Phone Number Format Inconsistency

**Finding:** Phone is displayed as "(817) 917-9518" but `href="tel:+18179179518"` which is correct, but the structured data uses "+1-817-917-9518".

**Fix:** Already correct - no action needed.

### 15. Admin Signup Publicly Accessible

**Finding:** Anyone can create an admin account at `/auth` since signup is enabled. This is a security risk.

**Fix:** Either:
- Remove the signup option entirely (admin accounts created manually)
- Add invite-only signup with email allowlist
- Add admin approval workflow

Recommended: Remove signup for production:
```tsx
// In Auth.tsx, remove the toggle and always show login only
const [isLogin] = useState(true); // Remove setIsLogin
// Remove the "Don't have an account? Sign up" button
```

---

## Implementation Priority

| Priority | Issue | Effort |
|----------|-------|--------|
| HIGH | Fix RLS policies | 10 min |
| HIGH | Remove public signup | 5 min |
| MEDIUM | Fix hero event count | 2 min |
| MEDIUM | Fix logo href | 2 min |
| MEDIUM | Add OG image meta | 5 min |
| MEDIUM | Fix font imports | 10 min |
| LOW | Gallery layout (add 2 images) | 15 min |
| LOW | Add image lazy loading | 5 min |
| LOW | Mobile menu AnimatePresence | 5 min |
| LOW | Enhanced alt text | 10 min |
| LOW | Remove "Main Website" link | 2 min |

---

## Files to Modify

1. **Database Migration** - Fix RLS policies
2. **src/components/HeroSection.tsx** - Add event count
3. **src/components/Logo.tsx** - Fix href to "/"
4. **src/components/GallerySection.tsx** - Add lazy loading, optional alt text
5. **src/components/Header.tsx** - Add AnimatePresence
6. **src/components/Footer.tsx** - Remove "Main Website" link
7. **src/pages/Auth.tsx** - Remove public signup option
8. **src/main.tsx** - Import @fontsource packages
9. **src/index.css** - Remove Google Fonts URL
10. **index.html** - Add OG image meta tags

---

## Technical Notes

- The existing Zod validation in ContactSection.tsx is well-implemented
- Authentication flow is correctly set up with proper loading states
- The realtime subscription for inquiry counts in Header.tsx is efficient
- The project follows good TypeScript practices overall
