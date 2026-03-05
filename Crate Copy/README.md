# Cargo Connect Design System (Crate Copy)

**Note:** Components use `@/` path aliases. Configure in your bundler (e.g. Vite: `resolve.alias: { "@": path.resolve(__dirname, "./src") }`) or update imports to relative paths.

A portable design system extracted from the Cargo Connect app. Use this in new projects for consistent styling, components, and layouts.

## Contents

### CSS
- **variables.css** – Design tokens (colors, typography, spacing, radii, shadows)
- **reset.css** – Modern CSS reset
- **base.css** – Base element styles
- **utilities.css** – Utility classes
- **animations.css** – Keyframes and animation classes
- **components.css** – Component styles (buttons, cards, nav, modals, forms, etc.)

### Import options

**With Tailwind:**
```css
@import "tailwindcss";
@import "./css/variables.css";
@import "./css/reset.css";
@import "./css/base.css";
@import "./css/utilities.css";
@import "./css/animations.css";
@import "./css/components.css";
```

**Without Tailwind:**
```css
@import "./css/design-system.css";
```

### Components (React)

Layout:
- `AppHeader` – Main app header
- `BottomNav` – Bottom navigation bar
- `ScreenHeader` – Screen title with back button

Cards & UI:
- `ActionCard` – Call-to-action card with count
- `KpiCard` – KPI display card
- `OrderCard`, `InvoiceCard`, `VisitCard` – List item cards

Navigation & filters:
- `TabFilter` – Underline tabs with sliding indicator
- `SpaceBar` – Progress bar for space allocation

Forms & inputs:
- `FormField` – Labeled form field
- `StepperControl` – Numeric stepper
- `DatePicker` – Date input
- `PhotoUpload` – Image upload area

Feedback & overlays:
- `EmptyState` – Empty list placeholder
- `Toast` – Toast notifications
- `BottomSheet` – Bottom sheet modal
- `ConfirmSheet` – Confirmation dialog
- `SuccessScreen` – Success completion screen

Other:
- `StatusBadge`, `SourceBadge` – Status indicators
- `ExpandableSection` – Collapsible section
- `ShimmerSkeleton`, `ScreenShimmer` – Loading skeletons
- `FormattedCurrency`, `SarIcon` – Currency formatting

### Dependencies

Components may depend on:
- **React** 18+
- **@phosphor-icons/react** – Icons
- **Tailwind CSS** – If using utility classes in components

Some components use context hooks (`useRouter`, `useI18n`, `useService`). For standalone use, you’ll need to:
1. Provide matching context providers, or
2. Refactor to accept props instead of context

## Setup in a new project

1. Copy the `Create Copy` folder into your project.
2. Install: `@phosphor-icons/react`, `tailwindcss` (optional)
3. Import the CSS in your main entry (see options above).
4. Import components from the design system folder and adjust import paths as needed.
