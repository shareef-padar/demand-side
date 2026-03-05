import { useState, useEffect } from 'react';
import { CaretUp, X } from '@phosphor-icons/react';
import SarCurrency from './SarCurrency.jsx';

/**
 * Expandable footer with price summary. Tapping the price area expands a bottom sheet with price breakdown.
 * @param {Object} props
 * @param {number} props.total - Total amount to display
 * @param {string} props.subtitle - Subtitle (e.g. "for 40 sqm/month")
 * @param {Array<{label: string, value: React.ReactNode}>} props.breakdown - Price breakdown rows
 * @param {string} props.primaryLabel - CTA button label
 * @param {() => void} props.onPrimaryAction - CTA button callback
 * @param {boolean} [props.primaryDisabled] - Whether CTA is disabled
 */
export default function ExpandablePriceFooter({
  total,
  subtitle,
  breakdown = [],
  primaryLabel,
  onPrimaryAction,
  primaryDisabled = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  return (
    <>
      <div className="detail-sticky-bar fixed bottom-0 left-0 right-0 z-50 w-full flex items-center overflow-visible">
        <div className="flex items-center gap-4 flex-1 w-full min-w-0 overflow-visible">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex-[2] min-w-0 flex flex-col gap-0.5 text-left cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          >
            <div className="text-xl font-bold text-[var(--color-text-900)] leading-6 tracking-tight flex items-center gap-1.5">
              <SarCurrency value={total} />
              <CaretUp size={14} weight="bold" className="text-[var(--color-text-400)] flex-shrink-0" />
            </div>
            <div className="text-sm font-normal text-[var(--color-text-500)] leading-5 tracking-tight">
              {subtitle}
            </div>
          </button>
          <button
            type="button"
            disabled={primaryDisabled}
            onClick={onPrimaryAction}
            className="relative z-10 flex-[1] shrink-0 h-12 px-6 py-2.5 bg-[var(--color-primary-500)] text-white rounded-2xl shadow-lg flex justify-center items-center text-base font-semibold leading-6 tracking-wide whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {primaryLabel}
          </button>
        </div>
      </div>

      {/* Bottom sheet overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsExpanded(false)}
        aria-hidden={!isExpanded}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div
          className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-[24px] shadow-[0_-4px_24px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out ${
            isExpanded ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-4 cursor-grab active:cursor-grabbing" aria-hidden />
            <div className="flex items-center justify-between px-4 mb-4">
              <h3 className="text-lg font-bold text-[#1A202C]">Price Breakdown</h3>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-2 -m-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors"
                aria-label="Close"
              >
                <X size={20} weight="bold" className="text-[#6B7280]" />
              </button>
            </div>
            <div className="space-y-3 px-4">
              {breakdown.map((row, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center py-2 ${
                    row.highlight ? 'border-t border-slate-100 pt-4 mt-2' : ''
                  }`}
                >
                  <span className={row.highlight ? 'font-bold text-[#1A202C]' : 'text-sm text-[var(--color-text-500)]'}>
                    {row.label}
                  </span>
                  <span className={`text-sm font-semibold ${row.highlight ? 'text-[var(--color-primary-500)] text-lg' : 'text-[var(--color-text-900)]'}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-4 mt-4 mb-4">
              <button
                type="button"
                disabled={primaryDisabled}
                onClick={() => { onPrimaryAction(); setIsExpanded(false); }}
                className="w-full h-12 px-6 py-2.5 text-white rounded-2xl shadow-lg flex justify-center items-center text-base font-semibold leading-6 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-primary-500)' }}
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
