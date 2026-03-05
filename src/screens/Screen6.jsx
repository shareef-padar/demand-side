import { CheckCircle, ChatCircle, DownloadSimple, Clock } from '@phosphor-icons/react';
import SarCurrency from '../components/SarCurrency.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { formatDate, pluralizeMonths } from '../lib/utils.js';

export default function Screen6() {
  const { selectedSqm, selectedWarehouse, selectedDate, selectedDuration, priceBreakdown, invoiceNum } = useBooking();

  const downloadInvoice = () => alert('Invoice download feature — connects to backend in production');
  const shareWhatsApp = () => alert('Share via WhatsApp — triggers WhatsApp API in production');

  return (
    <div className="screen active detail-screen-stack">
      <div className="detail-page relative h-full flex flex-col">
        {/* Scrollable content - matches Screen2/3 structure */}
        <div className="detail-scroll-wrap flex-1 overflow-y-auto min-h-0">
          {/* Success hero - compact header within content panel */}
          <div className="bg-[var(--color-primary-500)] rounded-b-[24px] px-4 pt-6 pb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
              <CheckCircle size={40} weight="regular" color="white" />
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">Booking Confirmed!</h2>
            <p className="text-sm text-white/90 mt-2">Your proforma invoice has been generated and sent to your WhatsApp.</p>
          </div>

          <div className="detail-content-panel bg-white -mt-4 rounded-t-[24px] relative z-10">
            <div className="p-4 space-y-6 pb-32">
              {/* WhatsApp note - detail-subblock style */}
              <div className="detail-subblock flex flex-row gap-3 items-start">
                <ChatCircle size={24} weight="regular" className="text-[var(--color-green-600)] flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-[var(--color-green-600)] leading-relaxed m-0">
                  Invoice sent to your WhatsApp. Our team will contact you shortly with payment instructions.
                </p>
              </div>

              {/* Invoice card - detail-subblock / line-items style */}
              <div className="detail-subblock rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--color-text-100)' }}>
                <div className="px-4 py-3 flex justify-between items-center" style={{ background: 'var(--color-text-50)' }}>
                  <div>
                    <div className="text-xs font-bold text-[var(--color-text-500)] uppercase tracking-wider">Proforma Invoice</div>
                    <div className="text-base font-bold text-[#1A202C]">{invoiceNum}</div>
                  </div>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">PENDING PAYMENT</span>
                </div>
                <div className="px-4 py-4">
                  <div className="line-items">
                    <div className="line-item">
                      <span className="li-label">Warehouse</span>
                      <span className="li-val">{selectedWarehouse.name}</span>
                    </div>
                    <div className="line-item">
                      <span className="li-label">Space</span>
                      <span className="li-val">{selectedSqm} sqm</span>
                    </div>
                    <div className="line-item">
                      <span className="li-label">Move-in Date</span>
                      <span className="li-val">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="line-item">
                      <span className="li-label">Duration</span>
                      <span className="li-val">
                        {selectedDuration} {pluralizeMonths(selectedDuration)}
                        {priceBreakdown && priceBreakdown.disc > 0 && ` (−${priceBreakdown.disc}%)`}
                      </span>
                    </div>
                    <div className="line-item">
                      <span className="li-label">Rate</span>
                      <span className="li-val"><SarCurrency value={selectedWarehouse.price} suffix="/sqm/mo" /></span>
                    </div>
                    <div className="line-item total">
                      <span>Total Due</span>
                      <span className="li-val">
                        {priceBreakdown ? <SarCurrency value={priceBreakdown.total} /> : <SarCurrency value={0} />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice expiry card */}
              <div className="detail-subblock rounded-2xl p-4" style={{ background: 'var(--color-alert-bg)', border: '1px solid var(--color-alert-border)' }}>
                <div className="flex items-center gap-2 text-sm font-bold text-[#6B3100] mb-2">
                  <Clock size={16} weight="regular" />
                  Invoice Valid for 24 Hours
                </div>
                <p className="text-xs text-[#6B3100] leading-normal m-0">
                  Payment must be initiated within 24 hours to secure your space. If no payment is received, our team will follow up and the invoice will expire.
                </p>
              </div>

              {/* Action buttons - same style as Screen2/3 CTA */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full h-12 px-6 py-2.5 bg-[var(--color-primary-500)] text-white rounded-2xl shadow-lg flex justify-center items-center gap-2 text-base font-semibold leading-6"
                  onClick={downloadInvoice}
                  aria-label="Download invoice"
                >
                  <DownloadSimple size={20} weight="regular" />
                  Download Invoice
                </button>
                <button
                  type="button"
                  className="w-full h-12 px-6 py-2.5 rounded-2xl flex justify-center items-center gap-2 text-base font-semibold leading-6 border border-[var(--color-text-100)] bg-white text-[var(--color-text-900)]"
                  onClick={shareWhatsApp}
                  aria-label="Share booking on WhatsApp"
                >
                  <ChatCircle size={20} weight="regular" />
                  Share on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
