import { MapPin, Warehouse } from '@phosphor-icons/react';
import BackButton from '../components/BackButton.jsx';
import SarCurrency from '../components/SarCurrency.jsx';
import ExpandablePriceFooter from '../components/ExpandablePriceFooter.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { formatDate, pluralizeMonths } from '../lib/utils.js';

export default function Screen5() {
  const { selectedSqm, selectedWarehouse, selectedDate, selectedDuration, priceBreakdown, goTo, confirmBooking } = useBooking();

  return (
    <div className="screen active detail-screen-stack">
      <div className="detail-page relative h-full flex flex-col">
        {/* Header - matches Screen3 */}
        <div className="flex items-start gap-3 px-4 pt-4 pb-2 flex-shrink-0">
          <BackButton onClick={() => goTo(3)} />
          <div>
            <h1 className="text-xl font-bold text-[#1A202C] leading-tight">Booking Summary</h1>
            <p className="text-sm text-[var(--color-text-500)] mt-1">Review before confirming</p>
          </div>
        </div>

        {/* Scrollable content - matches Screen2/3 structure */}
        <div className="detail-scroll-wrap flex-1 overflow-y-auto min-h-0">
          <div className="detail-content-panel bg-white rounded-t-[24px] pt-4 min-h-0">
            <div className="p-4 space-y-6">
              {/* Warehouse section - detail-subblock style */}
              <div className="detail-subblock">
                <h4 className="detail-subtitle">Warehouse</h4>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <div className="text-lg font-bold text-[#1A202C]">{selectedWarehouse.name}</div>
                    <div className="text-sm text-[#6B7280] mt-1 flex items-center gap-1.5">
                      <MapPin size={16} weight="regular" className="text-slate-400" />
                      {selectedWarehouse.loc}
                    </div>
                  </div>
                  <Warehouse size={28} weight="regular" className="text-[#1A202C]" />
                </div>
              </div>

              {/* Booking details - line-items style */}
              <div className="detail-subblock">
                <h4 className="detail-subtitle">Booking Details</h4>
                <div className="line-items">
                  <div className="line-item">
                    <span className="li-label">Space Required</span>
                    <span className="li-val">{selectedSqm} sqm</span>
                  </div>
                  <div className="line-item">
                    <span className="li-label">Move-in Date</span>
                    <span className="li-val">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="line-item">
                    <span className="li-label">Duration</span>
                    <span className="li-val">{selectedDuration} {pluralizeMonths(selectedDuration)}</span>
                  </div>
                  <div className="line-item">
                    <span className="li-label">Rate</span>
                    <span className="li-val"><SarCurrency value={selectedWarehouse.price} suffix="/sqm/mo" /></span>
                  </div>
                  {priceBreakdown && priceBreakdown.disc > 0 && (
                    <div className="line-item">
                      <span className="li-label">Discount</span>
                      <span className="li-val text-[#00B26F]">-{priceBreakdown.disc}% (save <SarCurrency value={priceBreakdown.saving} />)</span>
                    </div>
                  )}
                  <div className="line-item total">
                    <span className="li-label">Total Payable</span>
                    <span className="li-val">
                      {priceBreakdown ? <SarCurrency value={priceBreakdown.total} /> : <SarCurrency value={0} />}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms note */}
              <div className="detail-terms text-xs text-[var(--color-text-500)] leading-relaxed">
                By confirming, you agree to Cargo's standard storage terms. A proforma invoice will be generated and sent to your WhatsApp. Payment instructions will follow from our team.
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer - expandable price breakdown on tap */}
        <ExpandablePriceFooter
          total={priceBreakdown?.total ?? 0}
          subtitle={`Total for ${selectedSqm} sqm, ${selectedDuration} ${pluralizeMonths(selectedDuration, { lower: true })}`}
          breakdown={[
            { label: 'Rate', value: <SarCurrency value={selectedWarehouse.price} suffix="/sqm/mo" /> },
            { label: 'Space', value: `${selectedSqm} sqm` },
            { label: 'Duration', value: `${selectedDuration} ${pluralizeMonths(selectedDuration)}` },
            ...(priceBreakdown?.disc > 0
              ? [
                  { label: 'Subtotal', value: <SarCurrency value={priceBreakdown.base} /> },
                  { label: 'Discount', value: <span className="text-[#00B26F]">-{priceBreakdown.disc}% (save <SarCurrency value={priceBreakdown.saving} />)</span> },
                ]
              : []),
            { label: 'Total payable', value: <SarCurrency value={priceBreakdown?.total ?? 0} />, highlight: true },
          ]}
          primaryLabel="Confirm & Generate Invoice"
          onPrimaryAction={confirmBooking}
        />
        <div className="h-24" />
      </div>
    </div>
  );
}
