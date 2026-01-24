
# Replace Placeholder Images with Authentic Rose Backdrops

## Overview
Replace the two incorrect placeholder backdrop images in the gallery with the authentic rose backdrop photos you've uploaded.

## Image Mapping

| Current Placeholder | Replacement | New Title |
|---------------------|-------------|-----------|
| `backdrop-pink-roses.jpg` | `Roselight.jpg` | Roselight Wall |
| `backdrop-blush-roses.jpg` | `NewRoseblend.webp` | Pink & White Rose Blend |

## Implementation Steps

### Step 1: Copy Images to Project Assets
Copy the uploaded images to `src/assets/`:
- `user-uploads://Roselight.jpg` → `src/assets/backdrop-roselight.jpg`
- `user-uploads://NewRoseblend.webp` → `src/assets/backdrop-rose-blend.webp`

### Step 2: Update GallerySection.tsx
Modify the component to:
1. Update the import statements to reference the new image files
2. Update the gallery items with appropriate titles and SEO-friendly alt text:
   - **Roselight Wall**: "Elegant white and pink rose wall backdrop with greenery for outdoor events"
   - **Pink & White Rose Blend**: "Luxurious pink and white rose blend flower wall for elegant celebrations"

### Step 3: Remove Old Placeholder Files
Delete the incorrect placeholder images from `src/assets/`:
- `backdrop-pink-roses.jpg`
- `backdrop-blush-roses.jpg`

---

## Technical Details

**Files to modify:**
- `src/components/GallerySection.tsx` - Update imports and gallery item metadata

**Files to add:**
- `src/assets/backdrop-roselight.jpg`
- `src/assets/backdrop-rose-blend.webp`

**Files to delete:**
- `src/assets/backdrop-pink-roses.jpg`
- `src/assets/backdrop-blush-roses.jpg`

