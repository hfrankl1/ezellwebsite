# Design System & Customization Guide

## Theme Colors

The site uses a deep espresso black background with muted wine red accents. All colors are defined in CSS variables and Tailwind config for easy customization.

### Color Palette

- **Background**: `hsl(330, 15%, 5%)` - Near-black, very deep espresso
- **Foreground**: `hsl(0, 0%, 98%)` - Soft white text
- **Accent (Wine)**: `hsl(350, 65%, 35%)` - Muted wine red (rich burgundy)
- **Muted Text**: `hsl(0, 0%, 60%)` - Light gray
- **Border**: `hsl(0, 0%, 20% / 0.3)` - Subtle gray with low opacity
- **Card Background**: `hsl(330, 15%, 8%)` - Slightly lighter charcoal

### How to Customize Colors

#### Change Accent (Wine) Color

**Option 1: Tailwind Config** (`tailwind.config.ts`)
```typescript
wine: {
  DEFAULT: 'hsl(350, 65%, 35%)', // Change these HSL values
  light: 'hsl(350, 65%, 42%)',
  dark: 'hsl(350, 65%, 28%)',
  hover: 'hsl(350, 65%, 38%)',
}
```

**Option 2: CSS Variables** (`app/globals.css`)
```css
--accent: 350 65% 35%; /* Change HSL values here */
```

#### Change Background Color

In `app/globals.css`:
```css
--background: 330 15% 5%; /* Adjust lightness (5%) for darker/lighter */
```

## Camera Flash Effect

The camera flash effect is implemented in `components/CameraFlash.tsx` and used on the Photos page.

### Customize Flash Duration

In `app/photos/page.tsx`:
```tsx
<CameraFlash trigger={flashTrigger} duration={0.5} intensity={0.7} />
```

- `duration`: Flash duration in seconds (default: 0.5)
- `intensity`: Opacity peak (0-1, default: 0.7-0.8)

### Customize Flash Intensity

Adjust the `intensity` prop:
- Lower (0.4-0.5): Subtle flash
- Medium (0.6-0.7): Standard flash
- Higher (0.8-0.9): Strong flash

## Animation Timings

### Hero Animations

In `app/page.tsx`, the hero uses staggered animations:

```typescript
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1, // Delay between children
      delayChildren: 0.2,   // Initial delay
    },
  },
}

const itemVariants = {
  visible: {
    transition: {
      duration: 0.6,  // Animation duration
      ease: 'easeOut',
    },
  },
}
```

**To adjust:**
- `staggerChildren`: Time between each child animation (0.1s = 100ms)
- `delayChildren`: Initial delay before animations start
- `duration`: How long each animation takes

### Card Hover Animations

Cards use Framer Motion's `whileHover`:

```tsx
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: 'spring', stiffness: 300, damping: 20 }}
```

**To adjust:**
- `y: -8`: Lift distance (negative = up)
- `scale: 1.02`: Scale multiplier (1.02 = 2% larger)
- `stiffness`: Spring stiffness (higher = faster, snappier)
- `damping`: Spring damping (higher = less bounce)

### Page Transitions

Page transitions use a simple fade:

```tsx
transition={{ duration: 0.3, ease: 'easeInOut' }}
```

**To adjust:**
- `duration`: Transition duration (0.3s = 300ms)
- `ease`: Easing function ('easeInOut', 'easeOut', 'easeIn', etc.)

## Component Files

### Key Files Modified

1. **`tailwind.config.ts`** - Color palette and theme configuration
2. **`app/globals.css`** - CSS variables and global styles
3. **`components/CameraFlash.tsx`** - Flash effect component
4. **`app/photos/page.tsx`** - Photos page with flash effect
5. **`app/sounds/page.tsx`** - Sounds page with coming soon content
6. **`app/page.tsx`** - Homepage with enhanced animations
7. **`components/Navigation.tsx`** - Updated with new theme colors
8. **`components/Footer.tsx`** - Updated with new theme colors
9. **`components/BookButton.tsx`** - Updated with accent color

## Accessibility

The design system respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are minimized */
}
```

All animations will be reduced for users who prefer less motion.

