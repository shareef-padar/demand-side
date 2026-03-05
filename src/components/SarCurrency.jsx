import sarIcon from '../Icons/Saudi_Riyal_Symbol-2 (1).svg';

/**
 * Displays an amount in SAR (Saudi Riyal) with the SAR icon.
 * @param {Object} props
 * @param {number} props.value - Numeric amount to display
 * @param {string} [props.suffix] - Optional suffix (e.g. " / sqm / mo", "/ mo")
 * @param {string} [props.className] - Optional CSS class for the wrapper
 */
export default function SarCurrency({ value, suffix = '', className = '' }) {
  const formatted = typeof value === 'number' ? value.toLocaleString() : String(value);
  return (
    <span className={`sar-currency ${className}`.trim()}>
      <img
        src={sarIcon}
        alt="SAR"
        className="sar-icon"
        width={14}
        height={16}
      />
      {formatted}
      {suffix}
    </span>
  );
}
