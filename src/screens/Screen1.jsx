import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBooking } from '../context/BookingContext.jsx';
import { WAREHOUSES } from '../lib/constants.js';
import WarehouseCard from '../components/WarehouseCard.jsx';

const SORT_OPTIONS = [
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating-desc', label: 'Rating: Best First' },
  { id: 'rating-asc', label: 'Rating: Lowest First' },
];

const PRESETS = [
  { value: 20, size: '20 sqm' },
  { value: 40, size: '40 sqm' },
  { value: 60, size: '60 sqm' },
  { value: 80, size: '80 sqm' },
];

const SQM_PER_PARKING_LOT = 36;
const MAX_SQM = 2000;
const STEP = 10;

export default function Screen1() {
  const { selectedSqm, selectedPreset, setPreset, setSqm, setWarehouse, goTo } = useBooking();
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useState('price-asc');

  const handleSqmInput = useCallback((e) => {
    const raw = String(e.target.value).replace(/,/g, '').replace(/\D/g, '');
    const val = raw === '' ? 1 : parseInt(raw, 10);
    if (!isNaN(val) && val >= 1 && val <= MAX_SQM) setSqm(val);
  }, [setSqm]);

  const safeSqm = typeof selectedSqm === 'number' && !isNaN(selectedSqm) ? selectedSqm : 40;
  const increment = useCallback(() => setSqm(Math.min(MAX_SQM, safeSqm + STEP)), [setSqm, safeSqm]);
  const decrement = useCallback(() => setSqm(Math.max(1, safeSqm - STEP)), [setSqm, safeSqm]);

  const selectWarehouse = useCallback((id) => {
    setWarehouse(id);
    goTo(2);
  }, [setWarehouse, goTo]);

  const handleSortOption = useCallback((id) => {
    setSortBy(id);
    setSortSheetOpen(false);
  }, []);

  const parkingLots = Math.round(safeSqm / SQM_PER_PARKING_LOT);
  const formattedSqm = safeSqm.toLocaleString();

  const sortedWarehouseEntries = useMemo(() => {
    const entries = Object.entries(WAREHOUSES);
    if (sortBy === 'price-asc') return [...entries].sort((a, b) => a[1].price - b[1].price);
    if (sortBy === 'price-desc') return [...entries].sort((a, b) => b[1].price - a[1].price);
    if (sortBy === 'rating-desc') return [...entries].sort((a, b) => b[1].rating - a[1].rating);
    if (sortBy === 'rating-asc') return [...entries].sort((a, b) => a[1].rating - b[1].rating);
    return entries;
  }, [sortBy]);

  useEffect(() => {
    if (!sortSheetOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => e.key === 'Escape' && setSortSheetOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [sortSheetOpen]);

  return (
    <div className="screen active">
      <div className="content">
        <div className="card">
          <div className="section-title">Entered required amount of space</div>
          <div className="space-selection">
            <label htmlFor="space-sqm-input" className="space-label">Required Space</label>
            <div className="space-parking-hint">≈ {parkingLots} parking lot{parkingLots !== 1 ? 's' : ''}</div>
            <div className="space-stepper-pills">
              <button type="button" className="stepper-pill stepper-pill-btn" onClick={decrement} aria-label="Decrease 10 sqm">
                − 10 sqm
              </button>
              <div className="stepper-pill stepper-pill-value">
                <input
                  id="space-sqm-input"
                  type="text"
                  inputMode="numeric"
                  className="stepper-value-input"
                  value={formattedSqm}
                  onChange={handleSqmInput}
                  aria-label="Required space in square meters"
                />
                <span className="stepper-value-unit">sqm</span>
              </div>
              <button type="button" className="stepper-pill stepper-pill-btn" onClick={increment} aria-label="Increase 10 sqm">
                + 10 sqm
              </button>
            </div>
          </div>
          <div className="size-presets size-presets-row">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                className={`preset preset-simple ${selectedPreset === p.value ? 'selected' : ''}`}
                onClick={() => setPreset(p.value)}
                aria-label={`Select ${p.size}`}
                aria-pressed={selectedPreset === p.value}
              >
                {p.size}
              </button>
            ))}
          </div>
          <button type="button" className="help-estimate-link" onClick={() => alert('Estimation guide — connects to help flow in production')}>
            <span className="help-icon">?</span>
            Not sure? Help me estimate
          </button>
        </div>

        <div className="filter-bar filter-bar-spaced">
          <div className="result-count"><strong>3 warehouses</strong> available <span>for {safeSqm} sqm</span></div>
          <button type="button" className="sort-btn" aria-label="Sort warehouses" onClick={() => setSortSheetOpen(true)} aria-expanded={sortSheetOpen}>
            Sort ▾
          </button>
        </div>

        <div className="warehouse-list">
          {sortedWarehouseEntries.map(([id, wh]) => (
            <WarehouseCard
              key={id}
              warehouse={wh}
              warehouseId={id}
              selectedSqm={safeSqm}
              onClick={selectWarehouse}
            />
          ))}
        </div>
      </div>

      {/* Sort bottom sheet */}
      <div
        className={`sort-sheet-backdrop ${sortSheetOpen ? 'sort-sheet-backdrop-open' : ''}`}
        onClick={() => setSortSheetOpen(false)}
        role="presentation"
        aria-hidden={!sortSheetOpen}
      />
      <div
        className={`sort-sheet sort-sheet-mobile ${sortSheetOpen ? 'sort-sheet-open' : ''}`}
        role="dialog"
        aria-label="Sort warehouses by"
        aria-modal="true"
        aria-hidden={!sortSheetOpen}
      >
        <div className="sort-sheet-handle" aria-hidden="true" />
        <h3 className="sort-sheet-title">Sort by</h3>
        <div className="sort-sheet-options">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`sort-sheet-option ${sortBy === opt.id ? 'selected' : ''}`}
              onClick={() => handleSortOption(opt.id)}
              aria-pressed={sortBy === opt.id}
              aria-label={opt.label}
            >
              {opt.label}
              {sortBy === opt.id && <span className="sort-sheet-check" aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
