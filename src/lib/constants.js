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
      { name: 'Ahmed Al Mansoori', initial: 'A', color: '#E94560', text: 'Excellent facility, very clean and well-organized. The loading dock made our move-in very smooth. Highly recommend for any SME.', stars: 5, meta: 'Stored 3 months', date: '2 weeks ago' },
      { name: 'Ravi Sharma', initial: 'R', color: '#2680EB', text: 'Very professional team and great location. Security is top-notch. Access is easy and the booking process through Cargo was seamless.', stars: 5, meta: 'Stored 1 month', date: '1 week ago' },
      { name: 'Sarah Chen', initial: 'S', color: '#10B981', text: 'Stored our electronics here for 6 months. Climate control works perfectly. No issues at all. Will definitely renew.', stars: 5, meta: 'Stored 6 months', date: '3 days ago' },
      { name: 'Omar Khalil', initial: 'O', color: '#8B5CF6', text: 'Best warehouse in Al Quoz. Staff is helpful, loading bay is spacious. Price is fair for the quality you get.', stars: 4, meta: 'Stored 2 months', date: '2 weeks ago' },
      { name: 'Priya Patel', initial: 'P', color: '#F59E0B', text: 'Moved in last month. Process was smooth from booking to handover. Facility is well maintained.', stars: 5, meta: 'Stored 1 month', date: '5 days ago' }
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
      { name: 'Ahmed Al Mansoori', initial: 'A', color: '#E94560', text: 'Excellent facility, very clean.', stars: 5, meta: 'Stored 3 months', date: '1 week ago' },
      { name: 'Ravi Sharma', initial: 'R', color: '#2680EB', text: 'Very professional team.', stars: 5, meta: 'Stored 1 month', date: '4 days ago' },
      { name: 'James Wilson', initial: 'J', color: '#EC4899', text: 'SAIF Zone location is unbeatable for our logistics. Racking system saved us a lot of space.', stars: 5, meta: 'Stored 5 months', date: '2 weeks ago' },
      { name: 'Fatima Hassan', initial: 'F', color: '#06B6D4', text: 'Parking is ample, security 24/7. Our goods have been safe here for over a year.', stars: 5, meta: 'Stored 12 months', date: '3 days ago' },
      { name: 'David Kim', initial: 'D', color: '#84CC16', text: 'Good value for DIC area. Booking was straightforward. Recommend for SMEs.', stars: 4, meta: 'Stored 2 months', date: '1 week ago' }
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
      { name: 'Ahmed Al Mansoori', initial: 'A', color: '#E94560', text: 'Great facility.', stars: 5, meta: 'Stored 3 months', date: '2 weeks ago' },
      { name: 'Lina Al Rashid', initial: 'L', color: '#6366F1', text: 'Mussafah is convenient for Abu Dhabi operations. 7m height is perfect for our pallets.', stars: 5, meta: 'Stored 4 months', date: '1 week ago' },
      { name: 'Michael Torres', initial: 'M', color: '#14B8A6', text: 'CCTV and power supply are reliable. Good for industrial storage needs.', stars: 4, meta: 'Stored 1 month', date: '5 days ago' },
      { name: 'Nadia Ibrahim', initial: 'N', color: '#F97316', text: 'Clean and secure. Minimum 50 sqm works for our business. Fair pricing.', stars: 5, meta: 'Stored 2 months', date: '3 days ago' }
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
