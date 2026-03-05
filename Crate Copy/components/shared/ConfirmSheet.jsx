import { BottomSheet } from "./BottomSheet.jsx";

export function ConfirmSheet({ title, subtitle, details, confirmLabel = "Confirm", onConfirm, onCancel }) {
    return (
        <BottomSheet onClose={onCancel}>
            <div className="confirm-sheet">
                <h3 className="confirm-title">{title}</h3>
                {subtitle && <p className="confirm-subtitle">{subtitle}</p>}
                {details?.length > 0 && (
                    <div className="confirm-details">
                        {details.map((d) => (
                            <div key={d.label} className="detail-row">
                                <span className="detail-label">{d.label}</span>
                                <span className="detail-value">{d.value}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="confirm-actions">
                    <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>{confirmLabel}</button>
                </div>
            </div>
        </BottomSheet>
    );
}
