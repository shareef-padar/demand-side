# Warehouse Booking

A warehouse booking flow prototype for Cargo — Sharjah & Dubai.

## Structure

```
Demand Side/
├── warehouse-booking.html    # Main entry point
├── css/
│   └── warehouse-booking.css  # App-specific styles
├── js/
│   └── warehouse-booking.js   # Booking flow logic
├── Crate Copy/                # Design system (external)
│   └── css/
│       └── design-system.css
└── README-warehouse-booking.md
```

## Running

Open `warehouse-booking.html` in a browser. For local development with correct paths:

```bash
python3 -m http.server 8000
# Then open http://localhost:8000/warehouse-booking.html
```

## Dependencies

- **Crate Copy** design system (`Crate Copy/css/design-system.css`)
- **Lato** font (Google Fonts CDN)

## Architecture

- **HTML**: Semantic markup, data attributes for behavior
- **CSS**: External stylesheet, design tokens from Crate Copy
- **JS**: IIFE module, event delegation, no global pollution
