import { useId } from "react";

export function FormField({ label, value, type = "text", placeholder, error, readonly, options = [], onChange }) {
    const id = useId();
    return (
        <div className={`form-field ${error ? "error" : ""}`}>
            <label className="field-label" htmlFor={id}>{label}</label>
            {type === "select" ? (
                <select id={id} className="field-input" value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : type === "textarea" ? (
                <textarea id={id} className="field-input field-textarea" placeholder={placeholder} value={value || ""} readOnly={readonly} onInput={(e) => onChange?.(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />
            ) : (
                <input id={id} className="field-input" type={type} placeholder={placeholder} value={value ?? ""} readOnly={readonly} onInput={(e) => onChange?.(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />
            )}
            {error && <span id={`${id}-error`} className="field-error" role="alert">{error}</span>}
        </div>
    );
}
