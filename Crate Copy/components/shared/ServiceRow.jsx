import { SarIcon } from "./SarIcon.jsx";
import { StepperControl } from "./StepperControl.jsx";

export function ServiceRow({ name, qty, price, editable, onQtyChange, onPriceChange, onNameChange }) {
    return (
        <div className="service-row">
            <div className="service-name">
                {editable ? (
                    <input className="service-name-input" type="text" value={name} placeholder="Service name" onChange={(e) => onNameChange?.(e.target.value)} />
                ) : (
                    <span>{name}</span>
                )}
            </div>
            <div className="service-controls">
                <StepperControl value={qty} min={0} max={99} onChange={onQtyChange} />
                <div className="service-price">
                    <span className="price-label"><SarIcon size={14} /></span>
                    <input className="price-input" type="number" value={price} onChange={(e) => onPriceChange?.(parseFloat(e.target.value) || 0)} placeholder="0" />
                </div>
            </div>
        </div>
    );
}
