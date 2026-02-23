---
name: fcc_development_standards
description: Unified branding, schematic integrity, and regression prevention rules for the TFCC ecosystem.
---

# FCC Development Standards

This document serves as the "Source of Truth" for all engineering and design activities on the TFCC project. Adherence is mandatory to prevent schematic drift and maintain the premium aesthetic.

## 🎨 Aesthetic & Branding Protocol

The TFCC ecosystem uses a "Premium Tactical" design language.

| Element | HEX Code | CSS Variable (Recommended) |
| :--- | :--- | :--- |
| **Primary Red** | `#c41e3a` | `--color-primary` |
| **Accent Gold** | `#ffd700` | `--color-accent` |
| **Deep Background** | `#0a0a0a` | `--color-bg` |
| **Surface/Card** | `#121212` | `--color-surface` |
| **Border/Stroke** | `rgba(255,255,255,0.05)` | `--color-border` |

### Styling Rules
- **Typography**: Always use `font-black` for headers and `uppercase tracking-widest` for labels.
- **Icons**: Use `lucide-react` exclusively.
- **Animations**: Use `motion/react` with `AnimatePresence`. Default to subtle `y: 20` to `y: 0` fades.
- **Glassmorphism**: Use `backdrop-blur-sm` on all modals and dropdowns.

---

## 🏗️ Schematic Truth (Models)

NEVER assume frontend state. ALWAYS verify against `server/models/`.

### 1. Diet Plan (`DietPlan.js`)
```json
{
  "name": "String",
  "gymId": "ObjectId",
  "description": "String",
  "meals": [
    {
      "type": "String (e.g. Breakfast)",
      "items": ["String"],
      "calories": "Number",
      "protein": "String",
      "carbs": "String",
      "fats": "String"
    }
  ]
}
```

### 2. Workout Plan (`WorkoutPlan.js`)
```json
{
  "name": "String",
  "gymId": "ObjectId",
  "description": "String",
  "days": [
    {
      "dayName": "String",
      "exercises": [
        {
          "name": "String",
          "sets": "Number",
          "reps": "String",
          "weight": "String",
          "notes": "String"
        }
      ]
    }
  ]
}
```

### 3. User (`User.js`)
- `joinDate` is optional; always use `user?.joinDate ? new Date(...) : 'Recently'`.

---

## 🛡️ Regression Prevention Protocol

1. **No Silent Refactors**: Do not remove fields from components (e.g., `ex.weight` or `meal.calories`) even if they appear unused in a current view, unless explicitly requested.
2. **Schema First**: Before creating any `Add...Modal`, check the corresponding `.js` model in the `server` directory.
3. **Null Safety**: Every data point from the backend MUST be treated as potentially null.
4. **Search Resilience**: Search filters must use optional chaining and provide string fallbacks: `(item.field || '').toLowerCase()`.

---

## 🚦 Deployment & Testing Protocol

To maintain absolute parity with the production environment, follow this "Live-First" protocol:

1. **Local Development**: Code features locally but **DO NOT** perform local browser testing.
2. **Push to Source**: Sync changes to `main` immediately after coding.
3. **VPS Sync**: Pull changes onto the VPS.
4. **Build & Live Test**: Perform all verification, visual inspections, and functional testing directly on the live VPS environment (`tfcc.sriddha.com` or `/v2`).

> [!CAUTION] 
> Never rely on local environment behavior for final sign-off. If it's not tested on the VPS, it's not verified.
