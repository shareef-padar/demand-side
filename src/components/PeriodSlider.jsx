import { useCallback, useEffect, useRef, useState } from 'react';

/** Sync initial value to context when undefined. */
function useDefaultMonths(value, onChange) {
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    if (value == null || value < MIN_MONTHS) {
      didInit.current = true;
      onChange?.(3);
    }
  }, [value, onChange]);
}

const MIN_MONTHS = 1;
const MAX_MONTHS = 6;
const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = 88;
const STROKE = 8;
const KNOB_R = 14;

/** Angle for month index (1-6). Arc starts at bottom (90°) and goes clockwise. */
function monthToAngle(months) {
  return 90 + (months / MAX_MONTHS) * 360;
}

/** Polar to Cartesian for SVG (y down). */
function polarToCart(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** SVG arc path from startAngle to endAngle (degrees). */
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCart(cx, cy, r, startAngle);
  const end = polarToCart(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle >= 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

/** Format date range for display. */
function formatDateRange(months) {
  const start = new Date();
  const end = new Date();
  end.setMonth(end.getMonth() + months);
  const opts = { weekday: 'short', month: 'short', day: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} to ${end.toLocaleDateString('en-US', opts)}`;
}

export default function PeriodSlider({ value, onChange }) {
  useDefaultMonths(value, onChange);
  const months = Math.max(MIN_MONTHS, Math.min(MAX_MONTHS, value ?? 3));
  const svgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientPoint = useCallback(
    (clientX, clientY) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      // Math.atan2(y, x): 0=right, 90=bottom, 180=left, -90=top. Our arc: start at bottom (90°), clockwise.
      // Map: bottom(90°) = 0, right(0°) = 1.5mo, top(-90°/270°) = 3mo, left(180°) = 4.5mo
      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angleDeg < 0) angleDeg += 360;
      // Rotate so bottom=0: atan2 gives 90 for bottom. Our 0 = 90. So ourAngle = (angleDeg - 90 + 360) % 360
      const ourAngle = (angleDeg - 90 + 360) % 360;
      const m = Math.min(MAX_MONTHS, Math.max(1, Math.round((ourAngle / 360) * MAX_MONTHS) || 1));
      onChange?.(m);
    },
    [onChange]
  );

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      updateFromClientPoint(e.clientX, e.clientY);
    },
    [updateFromClientPoint]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      updateFromClientPoint(e.clientX, e.clientY);
    },
    [isDragging, updateFromClientPoint]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const endAngle = monthToAngle(months);
  const knobPos = polarToCart(CX, CY, RADIUS, endAngle);
  const arcPath = describeArc(CX, CY, RADIUS, 90, endAngle);

  return (
    <div className="period-slider">
      <div className="period-slider__ring-wrap">
        <svg
          ref={svgRef}
          width={SIZE}
          height={SIZE}
          className="period-slider__svg"
          onPointerDown={handlePointerDown}
          style={{ touchAction: 'none' }}
          aria-label="Select rental period in months"
          role="slider"
          aria-valuemin={MIN_MONTHS}
          aria-valuemax={MAX_MONTHS}
          aria-valuenow={months}
          aria-valuetext={`${months} ${months === 1 ? 'month' : 'months'}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault();
              onChange?.(Math.min(MAX_MONTHS, months + 1));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault();
              onChange?.(Math.max(MIN_MONTHS, months - 1));
            }
          }}
        >
          {/* Track dots */}
          {Array.from({ length: MAX_MONTHS + 1 }, (_, i) => {
            const a = 90 + (i / MAX_MONTHS) * 360;
            const p = polarToCart(CX, CY, RADIUS, a);
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={3}
                fill="var(--color-text-200)"
                className="period-slider__dot"
              />
            );
          })}
          {/* Track circle */}
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke="var(--color-text-100)"
            strokeWidth={STROKE}
          />
          {/* Active arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="var(--color-primary-500)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            className="period-slider__arc"
          />
          {/* Knob */}
          <circle
            cx={knobPos.x}
            cy={knobPos.y}
            r={KNOB_R}
            fill="var(--color-white)"
            stroke="var(--color-primary-500)"
            strokeWidth={2}
            className="period-slider__knob"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
            }}
          />
        </svg>
        <div className="period-slider__center">
          <span className="period-slider__num">{months}</span>
          <span className="period-slider__unit">{months === 1 ? 'month' : 'months'}</span>
        </div>
      </div>
      <div className="period-slider__date-range">
        {formatDateRange(months)}
      </div>
    </div>
  );
}
