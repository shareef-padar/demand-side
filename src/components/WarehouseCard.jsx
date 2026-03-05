import { memo } from 'react';
import { MapPin, Hourglass, Star } from '@phosphor-icons/react';
import SarCurrency from './SarCurrency.jsx';
import { formatWarehouseId } from '../lib/utils.js';

/**
 * Shared warehouse card component for listing warehouses.
 * @param {Object} props
 * @param {Object} props.warehouse - Warehouse data (loc, status, avail, rating, reviewsCount, price)
 * @param {string|number} props.warehouseId - Warehouse ID (e.g. '1', '2')
 * @param {number} props.selectedSqm - Selected square meters for price calculation
 * @param {function} props.onClick - Called when card is clicked
 */
function WarehouseCard({ warehouse, warehouseId, selectedSqm, onClick }) {
  const whId = formatWarehouseId(warehouseId);
  const totalPrice = warehouse.price * selectedSqm;

  return (
    <button
      type="button"
      className="warehouse-card"
      onClick={() => onClick(Number(warehouseId))}
      aria-label={`${whId}, ${warehouse.loc}, ${warehouse.rating} stars, ${warehouse.reviewsCount} reviews, ${totalPrice.toLocaleString()} SAR for ${selectedSqm} sqm. Select warehouse`}
    >
      <div className="wh-header">
        <div className="wh-header-left">
          <div className="wh-id">{whId}</div>
          <div className="wh-location">
            <MapPin size={14} weight="regular" className="wh-loc-icon" /> {warehouse.loc}
          </div>
        </div>
        {warehouse.status === 'fastFilling' && (
          <span className="wh-status-badge">
            <Hourglass size={14} weight="regular" className="wh-status-icon" /> Fast Filling
          </span>
        )}
      </div>
      <div className="wh-available">Available Space: {warehouse.avail}</div>
      <div className="wh-footer">
        <div className="wh-rating-block">
          <div className="wh-rating-row">
            <Star size={16} weight="fill" className="wh-star-icon" /> {warehouse.rating}
          </div>
          <div className="wh-reviews">{warehouse.reviewsCount} reviews</div>
        </div>
        <div className="wh-price-block">
          <div className="wh-price"><SarCurrency value={totalPrice} /></div>
          <div className="wh-price-for">for {selectedSqm} sqm</div>
        </div>
      </div>
    </button>
  );
}

export default memo(WarehouseCard);
