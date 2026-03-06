import { useState, useEffect, useRef, useMemo } from 'react';
import BackButton from '../components/BackButton.jsx';
import SarCurrency from '../components/SarCurrency.jsx';
import ExpandablePriceFooter from '../components/ExpandablePriceFooter.jsx';
import { CircularSlider } from 'react-circular-slider-svg';
import { format, addMonths } from 'date-fns';
import { calcTotal } from '../lib/constants.js';
import { useBooking } from '../context/BookingContext.jsx';

const today = new Date();
const maxDate = new Date(today);
maxDate.setDate(maxDate.getDate() + 15);

/** Format for input[type=date] (YYYY-MM-DD) */
function toInputDate(d) {
  if (!d) return '';
  return d.toISOString().slice(0, 10);
}

export default function Screen3() {
  const { selectedDate, setDate, selectedDuration, setDuration, selectedSqm, selectedWarehouse, goTo } = useBooking();

  const [months, setMonths] = useState(selectedDuration ?? 3);
  const totalForPeriod = useMemo(
    () => calcTotal(selectedWarehouse.price, selectedSqm, months),
    [selectedWarehouse.price, selectedSqm, months]
  );
  const prevMonthsRef = useRef(selectedDuration ?? 3);

  const startDate = selectedDate ? new Date(selectedDate) : new Date(today);
  const endDate = addMonths(startDate, months);

  useEffect(() => {
    setMonths(selectedDuration ?? 3);
    prevMonthsRef.current = selectedDuration ?? 3;
  }, [selectedDuration]);

  useEffect(() => {
    if (!selectedDate) {
      setDate(new Date(today));
    }
  }, [selectedDate, setDate]);

  const handleSliderChange = (value) => {
    if (prevMonthsRef.current >= 5 && value === 1) {
      setMonths(6);
      prevMonthsRef.current = 6;
    } else {
      setMonths(value);
      prevMonthsRef.current = value;
    }
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    if (val) setDate(new Date(val));
  };

  const handleContinue = () => {
    setDuration(months);
    goTo(5);
  };

  const canContinue = selectedDate && months >= 1;

  return (
    <div className="screen active">
      <div className="flex items-start gap-3 px-4 pt-4 pb-2">
        <BackButton onClick={() => goTo(2)} />
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-900)] leading-tight">Select Date & Duration</h1>
          <p className="text-sm text-[var(--color-text-500)] mt-1">Choose move-in date and rental period</p>
        </div>
      </div>
      <div className="content pt-4">
        {/* Date picker */}
        <div className="card mb-4">
          <div className="section-title mb-3">Move-in Date</div>
          <input
            type="date"
            value={toInputDate(startDate)}
            min={toInputDate(today)}
            max={toInputDate(maxDate)}
            onChange={handleDateChange}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-text-100)] text-base font-medium text-[var(--color-text-900)] bg-white"
          />
        </div>

        {/* Period slider */}
        <div className="card rental-period-card">
          <div className="section-title mb-3">Rental Period</div>
          <div className="flex flex-col items-center">
            <div className="relative w-[240px] h-[240px]">
              <CircularSlider
                size={240}
                trackWidth={12}
                minValue={1}
                maxValue={6}
                startAngle={90}
                endAngle={450}
                angleType={{ direction: 'cw', axis: '-y' }}
                handle1={{
                  value: months,
                  onChange: handleSliderChange,
                  color: '#ffffff',
                }}
                arcColor="var(--color-primary-500)"
                arcBackgroundColor="#E4E4E4"
                handleSize={18}
                coerceToInt
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-[var(--color-text-900)] leading-none">{months}</span>
                <span className="text-sm text-[var(--color-text-500)] font-medium mt-1">months</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Date range snackbar - fixed above footer, 8px gap */}
      <div
        className="fixed left-0 right-0 z-40 flex justify-center px-4"
        style={{ bottom: 'calc(80px + 8px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="w-full max-w-[calc(100%-2rem)] flex gap-4 py-4 rounded-2xl bg-white" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <div className="flex flex-1 flex-col gap-0.5 min-w-0">
            <span className="text-xs font-medium text-[var(--color-text-500)]">Start date</span>
            <span className="text-sm font-bold text-[var(--color-text-900)] truncate">
              {format(startDate, 'EEE, MMM d, yyyy')}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-0.5 min-w-0">
            <span className="text-xs font-medium text-[var(--color-text-500)]">End date</span>
            <span className="text-sm font-bold text-[var(--color-text-900)] truncate">
              {format(endDate, 'EEE, MMM d, yyyy')}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky footer - expandable price breakdown on tap */}
      <ExpandablePriceFooter
        total={totalForPeriod?.total ?? 0}
        subtitle={`for ${selectedSqm} sqm, ${months} ${months === 1 ? 'month' : 'months'}`}
        breakdown={[
          { label: 'Rate', value: <SarCurrency value={selectedWarehouse.price} suffix="/sqm/mo" /> },
          { label: 'Space', value: `${selectedSqm} sqm` },
          { label: 'Duration', value: `${months} ${months === 1 ? 'month' : 'months'}` },
          ...(totalForPeriod?.disc > 0
            ? [
                { label: 'Subtotal', value: <SarCurrency value={totalForPeriod.base} /> },
                { label: 'Discount', value: <span className="text-[#00B26F]">-{totalForPeriod.disc}% (save <SarCurrency value={totalForPeriod.saving} />)</span> },
              ]
            : []),
          { label: 'Total payable', value: <SarCurrency value={totalForPeriod?.total ?? 0} />, highlight: true },
        ]}
        primaryLabel="Reserve Space"
        onPrimaryAction={handleContinue}
        primaryDisabled={!canContinue}
      />
      <div className="h-20" />
    </div>
  );
}
