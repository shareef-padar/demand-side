/**
 * Warehouse Booking - Constants
 */

export const DISCOUNTS = Object.freeze({
  1: 0, 2: 0, 3: 5, 4: 8, 5: 10, 6: 12
});

export const WAREHOUSES = Object.freeze({
  1: {
    name: 'Al Quoz Industrial Block',
    loc: 'Al Quoz, Dubai',
    avail: '320 sqm',
    status: 'fastFilling',
    min: '10 sqm',
    height: '6m',
    price: 18,
    features: ['24/7 Security', 'Ambient', 'Loading Bay'],
    allowed: ['Dry goods', 'Electronics', 'Furniture', 'Auto parts'],
    notAllowed: ['Perishables', 'Chemicals', 'Flammables', 'Live goods'],
    reviews: [
      { name: 'Ahmed Al Mansoori', initial: 'A', color: '#E94560', text: 'Excellent facility, very clean and well-organized. The loading dock made our move-in very smooth. Highly recommend for any SME.', stars: 5 },
      { name: 'Ravi Sharma', initial: 'R', color: '#2680EB', text: 'Very professional team and great location. Security is top-notch. Access is easy and the booking process through Cargo was seamless.', stars: 5 }
    ],
    badge: 'verified',
    rating: 4.8,
    reviewsCount: 24,
    icon: '🏭',
    gradient: 'from-[#131E33] to-[#0a1628]'
  },
  2: {
    name: 'SAIF Zone Logistics Park',
    loc: 'DIC, Dubai',
    avail: '3244 sqm',
    status: 'fastFilling',
    min: '20 sqm',
    height: '8m',
    price: 15,
    features: ['Security', 'Parking', 'Racking'],
    allowed: ['Dry goods', 'Electronics', 'Furniture'],
    notAllowed: ['Perishables', 'Chemicals'],
    reviews: [
      { name: 'Ahmed Al Mansoori', initial: 'A', color: '#E94560', text: 'Excellent facility, very clean.', stars: 5 },
      { name: 'Ravi Sharma', initial: 'R', color: '#2680EB', text: 'Very professional team.', stars: 5 }
    ],
    badge: 'topRated',
    rating: 5.0,
    reviewsCount: 148,
    icon: '🏗️',
    gradient: 'from-[#3D2C6B] to-[#1A1A2E]'
  },
  3: {
    name: 'Mussafah Industrial Zone',
    loc: 'Mussafah, Abu Dhabi',
    avail: '500 sqm',
    status: null,
    min: '50 sqm',
    height: '7m',
    price: 12,
    features: ['CCTV', '3-Phase Power'],
    allowed: ['Dry goods', 'Electronics'],
    notAllowed: ['Perishables', 'Chemicals', 'Flammables'],
    reviews: [
      { name: 'Ahmed Al Mansoori', initial: 'A', color: '#E94560', text: 'Great facility.', stars: 5 }
    ],
    badge: null,
    rating: 4.5,
    reviewsCount: 17,
    icon: '🏢',
    gradient: 'from-[#2C5E6B] to-[#1A2E2E]'
  }
});

export function calcTotal(pricePerSqm, sqm, months) {
  const base = pricePerSqm * sqm * months;
  const disc = DISCOUNTS[months] ?? 0;
  const saving = Math.round(base * disc / 100);
  return { base, disc, saving, total: base - saving };
}
