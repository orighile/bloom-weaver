
# Remove "Follow us on Instagram" Button

## Summary
Remove the Instagram call-to-action button that appears below the gallery section.

## Change Required

**File:** `src/components/GallerySection.tsx`

Remove the entire "Instagram CTA" section (lines 185-204):
- This includes the motion.div wrapper and the Instagram link inside it

The gallery grid and lightbox functionality will remain unchanged.

---

## Technical Details

The code to be removed:
```jsx
{/* Instagram CTA */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-center mt-12"
>
  <a 
    href="https://www.instagram.com/tpecflowers" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-champagne font-medium elegant-underline"
  >
    <svg>...</svg>
    Follow us on Instagram
  </a>
</motion.div>
```

Note: Instagram links in the footer will remain, so visitors can still find your social media there.
