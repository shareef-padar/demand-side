export function DatePicker({ label, value, onChange }) {
    return (
        <div className="form-field">
            <label className="field-label">{label}</label>
            <input className="field-input" type="date" value={value || ""} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}
