import { Minus, Plus } from "@phosphor-icons/react";

export function StepperControl({ value, min = 0, max, step = 1, unit, onChange }) {
    const increment = () => {
        const next = value + step;
        if (max === undefined || next <= max) onChange(next);
    };
    const decrement = () => {
        const next = value - step;
        if (next >= min) onChange(next);
    };
    return (
        <div className="stepper-control">
            <button type="button" className={`stepper-btn minus ${value <= min ? "disabled" : ""}`} aria-label="Decrease" onClick={decrement}>
                <Minus size={16} />
            </button>
            <span className="stepper-value">{value}{unit && <span className="stepper-unit"> {unit}</span>}</span>
            <button type="button" className={`stepper-btn plus ${max !== undefined && value >= max ? "disabled" : ""}`} aria-label="Increase" onClick={increment}>
                <Plus size={16} />
            </button>
        </div>
    );
}
