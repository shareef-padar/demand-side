import { CaretLeft } from '@phosphor-icons/react';

/**
 * Reusable back button: white squircle, thin light outline, dark chevron, subtle shadow
 */
export default function BackButton({ onClick, ariaLabel = 'Back', className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`back-button w-10 h-10 bg-[var(--color-white)] rounded-2xl shrink-0 inline-flex justify-center items-center border border-[var(--color-text-100)] ${className}`}
      style={{
        backgroundColor: 'var(--color-white)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <CaretLeft size={20} weight="bold" className="text-[var(--color-text-900)]" />
    </button>
  );
}
