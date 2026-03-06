import { useCallback, useEffect, useRef, useState } from 'react';
import { MapPin, Star, ShieldCheck, Hourglass, Prohibit, Package, Camera, Flame, Truck, Clock } from '@phosphor-icons/react';
import BackButton from '../components/BackButton.jsx';
import SarCurrency from '../components/SarCurrency.jsx';
import ExpandablePriceFooter from '../components/ExpandablePriceFooter.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { formatWarehouseId } from '../lib/utils.js';

import whImg1 from '../Warehouse Images/Gemini_Generated_Image_ajqfb8ajqfb8ajqf (1).png';
import whImg2 from '../Warehouse Images/Gemini_Generated_Image_ccqx16ccqx16ccqx (1).png';
import whImg3 from '../Warehouse Images/Gemini_Generated_Image_ev17fsev17fsev17 (1).png';
import whImg4 from '../Warehouse Images/Gemini_Generated_Image_fa5mlyfa5mlyfa5m (1).png';
import whImg5 from '../Warehouse Images/Gemini_Generated_Image_qahbjaqahbjaqahb (1).png';
import whImg6 from '../Warehouse Images/Gemini_Generated_Image_qfzptsqfzptsqfzp.png';
import whImg7 from '../Warehouse Images/Gemini_Generated_Image_sojxm3sojxm3sojx (1).png';
import whImg8 from '../Warehouse Images/Gemini_Generated_Image_wfofqqwfofqqwfof (1).png';

const CAROUSEL_IMAGES = [whImg1, whImg2, whImg3, whImg4, whImg5, whImg6, whImg7, whImg8];
const CAROUSEL_INTERVAL_MS = 3000;

const TABS = ['Overview', 'Services', 'Policies', 'Reviews'];
const SECTION_IDS = ['overview', 'services', 'policies', 'reviews'];

const ACCESS_HOURS = [
  { days: 'Monday - Thursday', status: 'Open', hours: '9:00 AM - 10:00 PM', open: true },
  { days: 'Friday', status: 'Closed', hours: null, open: false },
  { days: 'Saturday - Sunday', status: 'Open', hours: '9:00 AM - 2:00 PM', open: true },
];

const AMENITIES = [
  { label: 'SFDA Approved', icon: ShieldCheck },
  { label: '24/7 CCTV', icon: Camera },
  { label: 'Fire Safety AMC', icon: Flame },
  { label: 'Civil Defence Approved', icon: ShieldCheck },
];

const SERVICES = [
  { label: 'Loading & Unloading', sub: 'from SAR 8.00/pallet', icon: Truck },
  { label: 'Cross Docking', sub: 'from SAR 5.00/box', icon: Package },
  { label: 'Inventory Management', sub: 'from SAR 300.00/month', icon: Package },
  { label: '24/7 Access', sub: 'Included in plan', icon: Clock },
];

const EQUIPMENT = [
  { label: 'Forklift', icon: Truck },
  { label: 'Jack Trolley', icon: Package },
  { label: 'Jack Trolley', icon: Package },
];

const PROHIBITED = [
  'Toxic and radioactive matters',
  'Highly flammable materials and liquids',
  'Drugs and medicine in any form',
  'Food',
];

const TERMS = 'Lorem ipsum dolor sit amet consectetur. Ante consectetur nunc fusce enim dui ultrices vitae turpis. Semper arcu odio aliquet tincidunt scelerisque sit eu lorem. Ultrices egestas arcu convallis fames congue. Et porttitor posuere aliquam at.';

const REVIEW_META = ['Stored 3 months', 'Stored 1 month', 'Stored 6 months', 'Stored 2 months', 'Stored 1 year', 'Stored 8 months', 'Stored 4 months'];
const REVIEW_DATES = ['1 week ago', '2 weeks ago', '3 days ago', '1 month ago', '2 months ago', '5 days ago', '3 weeks ago'];

export default function Screen2() {
  const { selectedSqm, selectedWarehouse, selectedWarehouseId, goTo } = useBooking();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMorphed, setIsMorphed] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const totalPrice = selectedWarehouse.price * selectedSqm;
  const displayId = formatWarehouseId(selectedWarehouseId);
  const showCivilDefence = selectedWarehouse.badge === 'verified';
  const showFastFilling = selectedWarehouse.status === 'fastFilling';
  const reviews = selectedWarehouse.reviews;

  const sectionRefs = useRef({});

  // Reset carousel when switching warehouses
  useEffect(() => {
    setCarouselIndex(0);
  }, [selectedWarehouseId]);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const scrollEl = sectionRefs.current['_scroll'];
    if (!scrollEl) return;

    const handleScroll = () => {
      const scrollTop = scrollEl.scrollTop;

      setIsMorphed(scrollTop > 240);

      const offset = isMorphed ? 100 : 140;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[SECTION_IDS[i]];
        if (el) {
          const rect = el.getBoundingClientRect();
          const containerRect = scrollEl.getBoundingClientRect();
          const sectionTopFromContent = rect.top - containerRect.top + scrollTop;
          if (scrollTop + offset >= sectionTopFromContent) {
            setActiveTab(TABS[i]);
            break;
          }
        }
      }
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [isMorphed]);

  const scrollToSection = useCallback((tab) => {
    setActiveTab(tab);
    const id = tab.toLowerCase();
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="screen active detail-screen-stack">
      <div className="detail-page relative h-full flex flex-col">

        {/* FIXED MORPHED HEADER - Tailwind transition (no Framer Motion) */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 transition-all duration-300 ${
            isMorphed ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center px-4 pt-2 pb-1 gap-3">
            <BackButton onClick={() => goTo(1)} />
            <h2 className="text-lg font-bold text-[#1A202C]">{displayId}</h2>
            <div className="flex items-center gap-1.5 ml-auto">
              <Star size={16} weight="fill" className="text-amber-400" />
              <span className="text-sm font-semibold text-[#1A202C]">{selectedWarehouse.rating}</span>
              <span className="text-xs text-[#6B7280]">({selectedWarehouse.reviewsCount})</span>
            </div>
          </div>
          <div className="flex overflow-x-auto no-scrollbar px-4 pb-2">
            <div
              className="flex p-2 bg-white rounded-[80px] inline-flex justify-start items-center gap-1 overflow-hidden"
              style={{
                boxShadow: '0px 1px 0.5px 0.05px rgba(29,41,61,0.02)',
                outline: '1px solid var(--color-text-100)',
                outlineOffset: -1,
              }}
              role="tablist"
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  onClick={() => scrollToSection(tab)}
                  aria-selected={activeTab === tab}
                  className={`px-4 py-2 rounded-[80px] flex justify-center items-center gap-1 text-base font-semibold leading-6 tracking-wide whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-500)] outline outline-1 outline-[var(--color-primary-500)]'
                      : 'bg-transparent text-[var(--color-text-900)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SCROLLING CONTENT */}
        <div className="detail-scroll-wrap flex-1 overflow-y-auto min-h-0" ref={(el) => { sectionRefs.current['_scroll'] = el; }}>

          {/* Hero Image Carousel */}
          <div className="detail-hero-block h-[300px] w-full relative overflow-hidden">
            {!isMorphed && (
              <div className="absolute top-4 left-4 z-20">
                <BackButton onClick={() => goTo(1)} />
              </div>
            )}
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{
                width: `${CAROUSEL_IMAGES.length * 100}%`,
                transform: `translateX(-${(carouselIndex / CAROUSEL_IMAGES.length) * 100}%)`,
              }}
            >
              {CAROUSEL_IMAGES.map((src, i) => (
                <img
                  key={i}
                  className="h-full flex-shrink-0 object-cover"
                  style={{ width: `${100 / CAROUSEL_IMAGES.length}%` }}
                  src={src}
                  alt=""
                />
              ))}
            </div>
            <div className="detail-hero-badge absolute bottom-4 right-4 mb-8 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {carouselIndex + 1}/{CAROUSEL_IMAGES.length}
            </div>
          </div>

          <div className="detail-content-panel bg-white -mt-6 rounded-t-[24px] relative z-10 min-h-[120vh]">

            {/* HEADER + TABS - sticky block, header hidden when morphed */}
            <div className="sticky top-0 z-40 flex flex-col gap-2 px-4 pt-4 pb-4 -mb-2 bg-white shadow-[0_1px_0_0_var(--color-text-100)]">
              <div className={`flex flex-col transition-opacity duration-300 ${isMorphed ? 'opacity-0' : 'opacity-100'}`}>
                {/* Row 1: Warehouse ID (left) | Rating + reviews (right) */}
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-[#1A202C]">{displayId}</h2>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Star size={16} weight="fill" className="text-amber-400" />
                    <span className="text-base font-semibold text-[#1A202C]">{selectedWarehouse.rating}</span>
                    <span className="text-sm text-[#6B7280]">({selectedWarehouse.reviewsCount})</span>
                  </div>
                </div>
                {/* Row 2: Location */}
                <div className="flex items-center gap-1.5 mt-2 text-[#6B7280] text-sm">
                  <MapPin size={16} weight="regular" className="text-slate-400" />
                  <span>{selectedWarehouse.loc}</span>
                </div>
                {/* Row 3: Badges */}
                <div className="flex gap-2 mt-3">
                  {showCivilDefence && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#E0F7FA] text-[#00695C] border border-[#80CBC4]">
                      <ShieldCheck size={12} weight="regular" /> Civil Defence
                    </span>
                  )}
                  {showFastFilling && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#FFF3E0] text-[#E65100] border border-[#FFCC80]">
                      <Hourglass size={12} weight="regular" /> Fast Filling
                    </span>
                  )}
                </div>
              </div>
              <div
                className="flex overflow-x-auto no-scrollbar p-2 bg-white rounded-[80px] inline-flex justify-start items-center gap-1 w-full max-w-full"
                role="tablist"
                style={{
                  boxShadow: '0px 1px 0.5px 0.05px rgba(29,41,61,0.02)',
                  outline: '1px solid var(--color-text-100)',
                  outlineOffset: -1,
                }}
              >
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    onClick={() => scrollToSection(tab)}
                    aria-selected={activeTab === tab}
                    className={`px-4 py-2 rounded-[80px] flex justify-center items-center gap-1 text-base font-semibold leading-6 tracking-wide whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-500)] outline outline-1 outline-[var(--color-primary-500)]'
                        : 'bg-transparent text-[var(--color-text-900)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTIONS */}
            <div className="p-4 space-y-10">

              <div ref={(el) => { sectionRefs.current['overview'] = el; }} id="overview" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-6">Overview</h3>
                <div className="detail-section-body">
                  <div className="detail-subblock">
                    <h4 className="detail-subtitle">Access Hours</h4>
                    <div className="detail-access-list">
                      {ACCESS_HOURS.map((row) => (
                        <div key={row.days} className="detail-access-item">
                          <span className={`detail-access-dot ${row.open ? 'open' : 'closed'}`} aria-hidden />
                          <div className="detail-access-body">
                            <div className="detail-access-left">
                              <span className="detail-access-days">{row.days}</span>
                              <span className="detail-access-status">{row.status}</span>
                            </div>
                            {row.hours && <span className="detail-access-hours">{row.hours}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="detail-subblock">
                    <h4 className="detail-subtitle-amenities">Amenities</h4>
                    <div className="detail-amenity-list">
                      {AMENITIES.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="detail-amenity-item">
                            <div className="detail-amenity-icon">
                              <Icon size={20} weight="regular" />
                            </div>
                            <span className="detail-amenity-label">{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button type="button" className="detail-show-all">Show All</button>
                  </div>
                </div>
              </div>

              <div ref={(el) => { sectionRefs.current['services'] = el; }} id="services" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-6">Services</h3>
                <div className="detail-section-body">
                  <div className="detail-subblock">
                    <h4 className="detail-subtitle">Services</h4>
                    <div className="detail-service-list">
                      {SERVICES.map((s) => {
                        const Icon = s.icon;
                        return (
                        <div key={s.label} className="detail-service-item">
                          <div className="detail-amenity-icon">
                            <Icon size={20} weight="regular" />
                          </div>
                          <div className="detail-service-content">
                            <span className="detail-service-label">{s.label}</span>
                            <span className="detail-service-sub">{s.sub}</span>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="detail-subblock">
                    <h4 className="detail-subtitle">Equipment</h4>
                    <div className="detail-amenity-list">
                      {EQUIPMENT.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={`${item.label}-${i}`} className="detail-amenity-item">
                            <div className="detail-amenity-icon">
                              <Icon size={20} weight="regular" />
                            </div>
                            <span className="detail-amenity-label">{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div ref={(el) => { sectionRefs.current['policies'] = el; }} id="policies" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-6">Policies</h3>
                <div className="detail-section-body">
                  <div className="detail-subblock">
                    <h4 className="detail-subtitle">What is prohibited</h4>
                    <div className="detail-prohibited-list">
                      {(selectedWarehouse.notAllowed?.length ? selectedWarehouse.notAllowed : PROHIBITED).map((item) => (
                        <div key={item} className="detail-prohibited-item">
                          <div className="detail-amenity-icon">
                            <Prohibit size={20} weight="regular" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="detail-show-all">Show All</button>
                  </div>
                  <div className="detail-subblock">
                    <h4 className="detail-subtitle-terms">Terms & Condition</h4>
                    <p className="detail-terms">{TERMS}</p>
                  </div>
                </div>
              </div>

              <div ref={(el) => { sectionRefs.current['reviews'] = el; }} id="reviews" className="scroll-mt-24 pb-24">
                <h3 className="text-2xl font-bold mb-6">Reviews</h3>
                <div className="detail-reviews-row">
                  {reviews.map((r, i) => (
                    <div key={r.name} className="detail-review-wrapper">
                      {i > 0 && <div className="detail-review-divider" />}
                      <div className="detail-review-card">
                        <div className="detail-review-head">
                          <img className="detail-review-avatar" src="https://placehold.co/44x44" alt="" />
                          <div>
                            <div className="detail-review-name">{r.name}</div>
                            <div className="detail-review-meta">{REVIEW_META[i] || 'Stored 3 months'}</div>
                          </div>
                        </div>
                        <div className="detail-review-rating">
                          <span className="detail-review-stars">
                            {Array.from({ length: r.stars }, (_, j) => (
                              <Star key={j} size={12} weight="fill" />
                            ))}
                          </span>
                          <span className="detail-review-dot" />
                          <span className="detail-review-date">{REVIEW_DATES[i % REVIEW_DATES.length]}</span>
                        </div>
                        <div className="detail-review-text">{r.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* STICKY FOOTER - expandable price breakdown on tap */}
        <ExpandablePriceFooter
          total={totalPrice}
          subtitle={`for ${selectedSqm} sqm/month`}
          breakdown={[
            { label: 'Rate', value: <SarCurrency value={selectedWarehouse.price} suffix="/sqm/mo" /> },
            { label: 'Space', value: `${selectedSqm} sqm` },
            { label: 'Monthly total', value: <SarCurrency value={totalPrice} />, highlight: true },
          ]}
          primaryLabel="Reserve Space"
          onPrimaryAction={() => goTo(3)}
        />
      </div>
    </div>
  );
}
