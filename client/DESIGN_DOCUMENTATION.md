# Design Documentation
## Fight Club Championship Website

**Last Updated:** January 2025  
**Version:** 1.0

---

## Table of Contents

1. [Design System Overview](#design-system-overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Section Structure](#section-structure)
7. [Navigation Architecture](#navigation-architecture)
8. [Responsive Design Guidelines](#responsive-design-guidelines)
9. [Performance Considerations](#performance-considerations)
10. [Accessibility Standards](#accessibility-standards)

---

## Design System Overview

The Fight Club Championship website follows a dark, premium sports aesthetic with gold and red accent colors. The design emphasizes strength, competition, and excellence while maintaining professional clarity and accessibility.

### Design Principles

1. **Strength & Power**: Bold typography, strong contrasts, and dynamic animations
2. **Premium Quality**: Gold accents, refined spacing, and polished interactions
3. **Performance First**: Optimized animations, lazy loading, and mobile-first approach
4. **Scalability**: Modular components and consistent patterns for easy expansion

---

## Color Palette

### Primary Colors

```css
--color-primary-black: #0a0a0a    /* Main background */
--color-charcoal: #1a1a1a          /* Section backgrounds, cards */
--color-red: #c41e3a              /* Primary accent, CTAs */
--color-gold: #d4af37             /* Secondary accent, highlights */
--color-light-grey: #e0e0e0       /* Primary text color */
```

### Color Usage Guidelines

- **Primary Black (#0a0a0a)**: Main page background, creates depth
- **Charcoal (#1a1a1a)**: Section backgrounds, card containers, creates layering
- **Red (#c41e3a)**: 
  - Primary CTA buttons
  - Important highlights
  - Energy effects and glows
  - Hover states for interactive elements
- **Gold (#d4af37)**:
  - Section headings
  - Secondary highlights
  - Premium accents
  - Navigation hover states
- **Light Grey (#e0e0e0)**: Primary body text, ensures readability on dark backgrounds

### Gradient Patterns

- **Red Gradient**: `from-[#c41e3a] to-[#8b1526]` - Used for primary CTAs
- **Gold Gradient**: `from-[#d4af37] to-[#b8941f]` - Used for hover states and premium elements
- **Background Gradients**: `from-[#0a0a0a] to-[#1a1a1a]` - Alternating section backgrounds for visual rhythm

---

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
             'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Heading Hierarchy

| Element | Desktop Size | Mobile Size | Weight | Usage |
|---------|--------------|-------------|--------|-------|
| h1 | 3.5rem (56px) | 2rem (32px) | 800 | Hero headlines |
| h2 | 2.5rem (40px) | 1.75rem (28px) | 800 | Section titles |
| h3 | 1.75rem (28px) | 1.25rem (20px) | 800 | Subsection titles, card titles |

### Typography Rules

- **All headings**: Uppercase, letter-spacing: -0.02em, line-height: 1.1
- **Body text**: Regular weight, line-height: 1.5-1.75 (relaxed for readability)
- **Color hierarchy**: 
  - Headings: White (#ffffff)
  - Section headings: Gold (#d4af37)
  - Body text: Light grey (#b0b0b0)
  - Secondary text: Medium grey (#808080)

---

## Spacing & Layout

### Container System

- **Max Width**: `max-w-7xl` (1280px) for main content
- **Padding**: 
  - Mobile: `px-4` (16px)
  - Tablet: `px-6` (24px)
  - Desktop: `px-8` (32px)

### Section Spacing

- **Vertical Padding**: `py-20` (80px) for all major sections
- **Section Gaps**: Consistent spacing between sections creates visual rhythm
- **Internal Spacing**: 
  - Small gaps: `gap-4` (16px)
  - Medium gaps: `gap-6` (24px)
  - Large gaps: `gap-8` (32px)
  - Extra large: `gap-12` (48px) or `gap-16` (64px)

### Grid System

- **Cards**: Responsive grids using `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Content**: Flexible layouts that adapt from single column (mobile) to multi-column (desktop)

---

## Component Library

### Reusable Components

#### 1. **CoachCard** (`src/components/CoachCard.tsx`)

**Purpose**: Display coach information in a card format

**Props**:
```typescript
interface CoachCardProps {
  name: string;
  sport: string;
  experience: string;
  credentials: string;
  image?: string;
  index: number;
}
```

**Usage**:
- Used in Coaches section to display coaches by sport category
- Scalable: Easy to add more coaches by duplicating the component
- Responsive: Adapts to grid layout (1-4 columns based on screen size)

**Styling**:
- Background: `bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]`
- Border: `border-2 border-[#2a2a2a]` with hover state `hover:border-[#d4af37]`
- Hover effect: `whileHover={{ y: -10 }}` for subtle lift

#### 2. **JudgeCard** (`src/components/JudgeCard.tsx`)

**Purpose**: Display judge/referee information

**Similar structure to CoachCard** but with judge-specific styling

#### 3. **CategoryCard** (`src/components/CategoryCard.tsx`)

**Purpose**: Display category/event information

**Features**:
- Hover scale effect
- CTA button with icon
- Gradient background

#### 4. **EventCard** (`src/components/EventCard.tsx`)

**Purpose**: Display competition event details

**Features**:
- Date, city, venue information
- Featured event highlighting
- Click interaction for modal

#### 5. **EventModal** (`src/components/EventModal.tsx`)

**Purpose**: Detailed event information overlay

**Features**:
- Portal rendering (prevents z-index issues)
- Smooth animations
- Keyboard accessibility (ESC to close)
- Body scroll lock when open

### Component Reusability Guidelines

1. **Consistent Props Pattern**: All card components follow similar prop structures
2. **Animation Pattern**: Use `motion/react` with consistent delay patterns (`index * 0.1`)
3. **Viewport Animations**: Use `whileInView` with `viewport={{ once: true }}` for scroll-triggered animations
4. **Hover States**: Consistent hover effects (scale, translate, border color change)
5. **Color Consistency**: Use design system colors, never hardcode hex values

---

## Section Structure

### Page Flow (Top to Bottom)

1. **Hero Section** (`#home`)
   - Full-screen hero with animated background
   - Main headline and CTA
   - Stats and features

2. **Strongest Man Section** (`#strongest-man`)
   - What is Strongest Man explanation
   - Why University-Level Championships Matter
   - Event showcase with images

3. **Universities Section** (`#universities`)
   - Participating universities
   - Benefits for institutions
   - Registration information

4. **Athletes Section** (`#athletes`)
   - Who can participate
   - Registration process
   - Code of conduct
   - Safety disclaimer

5. **Coaches Section** (`#coaches`) ⭐ NEW
   - Coaches organized by sport category:
     - Boxing
     - Kick Boxing
     - Wrestling
     - Karate
     - Kung Fu
   - Scalable grid layout
   - Contact CTA

6. **Shop Section** (`#shop`)
   - Merchandise showcase
   - Product grid

7. **Vision/Roadmap Section** (`#roadmap`)
   - Multi-phase roadmap
   - Future expansion plans

8. **Inauguration Section** (`#inauguration`)
   - Countdown timer
   - Guest information

9. **Contact & Footer** (`#contact`)
   - Contact form
   - Footer information
   - Social links

### Section Design Patterns

#### Background Alternation
- Sections alternate between `from-[#0a0a0a] to-[#1a1a1a]` and `from-[#1a1a1a] to-[#0a0a0a]`
- Creates visual rhythm and depth

#### Logo Watermarks
- Subtle logo watermarks in background (mobile: opacity 0.08, desktop: opacity 0.03)
- Positioned center or offset for visual interest
- Disabled on mobile for performance

#### Energy Glows (Desktop Only)
- Animated gradient blurs for visual interest
- Red and gold glows positioned strategically
- Hidden on mobile for performance

#### Section Headers
- Consistent pattern:
  - Icon (16x16, gold color)
  - Heading (h2, gold color)
  - Description text (light grey, max-width constrained)

---

## Navigation Architecture

### Navigation Order (Matches Page Flow)

1. **Home** - Hero section
2. **Strongest Man** - Main competition information
3. **Universities** - Institutional information
4. **Athletes** - Participant information
5. **Coaches** - Coaching staff by sport ⭐ NEW
6. **Shop** - Merchandise
7. **Vision** - Roadmap and future plans
8. **Inauguration** - Event countdown
9. **Contact** - Contact form and footer

### Navigation Rationale

- **Logical Flow**: Navigation order matches the visual flow of the page (top to bottom)
- **User Journey**: Guides users from general information → specific details → action items
- **Discoverability**: All major sections accessible from navigation
- **Consistency**: Same order in desktop and mobile navigation

### Navigation Components

#### Desktop Navigation
- Horizontal layout with hover underlines
- CTA button (Register Now) prominently displayed
- Smooth scroll behavior

#### Mobile Navigation
- Full-height drawer menu
- Same order as desktop
- CTA button in menu drawer
- Auto-close on link click

### Navigation Styling

- **Active State**: Gold underline on hover (`hover:text-[#d4af37]`)
- **Hover Effect**: Smooth color transition and underline animation
- **CTA Button**: Red gradient with gold hover state

---

## Responsive Design Guidelines

### Breakpoints

- **Mobile**: `< 640px` (sm)
- **Tablet**: `640px - 1024px` (sm to lg)
- **Desktop**: `> 1024px` (lg+)

### Mobile-First Approach

1. **Base Styles**: Designed for mobile
2. **Progressive Enhancement**: Add desktop features with `md:` and `lg:` prefixes
3. **Performance**: Disable heavy animations on mobile

### Mobile Optimizations

- **Backdrop Blur**: Disabled on mobile (performance)
- **Complex Blurs**: Simplified or removed
- **Animations**: Reduced duration and complexity
- **Shadows**: Simplified to basic shadows
- **Logo Watermarks**: Reduced opacity, smaller sizes

### Responsive Patterns

- **Grid Layouts**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Typography**: Responsive font sizes using Tailwind breakpoints
- **Spacing**: Responsive padding (`px-4 sm:px-6 lg:px-8`)
- **Images**: Responsive sizing with `w-full` and aspect ratios

---

## Performance Considerations

### Animation Strategy

- **Scroll-Triggered**: Use `whileInView` with `viewport={{ once: true }}` to animate only when visible
- **Staggered Delays**: Use `index * 0.1` for sequential animations
- **Reduced Motion**: Respect `prefers-reduced-motion` media query

### Image Optimization

- **Lazy Loading**: All images use `loading="lazy"`
- **Cloudinary**: Images served via Cloudinary with optimization parameters
- **Responsive Images**: Use appropriate sizes for different breakpoints

### Code Splitting

- **Component-Based**: Each section is a separate component
- **Dynamic Imports**: Consider for heavy components if needed

### Mobile Performance

- **Disable Expensive Effects**: Backdrop blur, complex shadows, heavy animations
- **GPU Acceleration**: Use `transform` and `will-change` strategically
- **Cache Strategy**: Static assets cached via `_headers` file

---

## Accessibility Standards

### WCAG Compliance

- **Color Contrast**: All text meets WCAG AA standards
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Focus States**: Visible focus indicators
- **ARIA Labels**: Proper labels for icons and buttons
- **Semantic HTML**: Proper heading hierarchy and semantic elements

### Accessibility Features

- **Reduced Motion**: Respects user preferences
- **Alt Text**: All images have descriptive alt text
- **ARIA Attributes**: Menu states, modal states properly labeled
- **Skip Links**: Consider adding for keyboard users

---

## Future Expansion Guidelines

### Adding New Sections

1. **Follow Section Pattern**:
   - Use alternating background gradients
   - Include section header with icon, heading, description
   - Add logo watermark (optional)
   - Add energy glows for desktop (optional)

2. **Update Navigation**:
   - Add to both desktop and mobile navigation arrays
   - Maintain logical order

3. **Component Reusability**:
   - Use existing card components when possible
   - Create new components following established patterns

### Adding New Coaches

1. **Add to Appropriate Category**: Find the sport category in Coaches section
2. **Duplicate CoachCard**: Copy existing CoachCard component
3. **Update Props**: Change name, experience, credentials
4. **Update Index**: Ensure sequential index for animation delays

### Adding New Sports Categories

1. **Duplicate Category Block**: Copy entire category section (Boxing, Kick Boxing, etc.)
2. **Update Heading**: Change sport name
3. **Update CoachCard Props**: Change `sport` prop
4. **Update Index**: Continue sequential indexing

---

## File Structure

```
src/
├── components/
│   ├── CoachCard.tsx          # Coach display card
│   ├── JudgeCard.tsx          # Judge display card
│   ├── CategoryCard.tsx       # Category display card
│   ├── EventCard.tsx          # Event display card
│   ├── EventModal.tsx         # Event detail modal
│   ├── Hero.tsx               # Hero section
│   ├── ContactFooter.tsx      # Contact form and footer
│   └── ...
├── styles/
│   └── globals.css            # Global styles and design tokens
└── App.tsx                    # Main application with all sections
```

---

## Design Tokens Reference

### Spacing Scale
- `4` = 16px (1rem)
- `6` = 24px (1.5rem)
- `8` = 32px (2rem)
- `12` = 48px (3rem)
- `16` = 64px (4rem)
- `20` = 80px (5rem)

### Border Radius
- `rounded-lg` = 8px
- `rounded-xl` = 12px
- `rounded-2xl` = 16px
- `rounded-full` = 9999px (circular)

### Shadows
- `shadow-md` = Medium shadow
- `shadow-lg` = Large shadow
- `shadow-xl` = Extra large shadow
- Custom colored shadows: `shadow-[#c41e3a]/30`

---

## Maintenance Notes

- **Design System Updates**: Update this document when design tokens change
- **Component Changes**: Document new components and their usage
- **Navigation Updates**: Keep navigation order aligned with page structure
- **Performance**: Monitor and optimize based on real-world usage

---

**Document Maintained By**: Development Team  
**For Questions**: Refer to this document or contact the design team
