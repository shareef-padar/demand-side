import { Info } from "@phosphor-icons/react";

export function KpiCard({ label, value, icon: Icon, iconBg = "var(--color-icon-blue-bg)", iconColor = "var(--color-text-500)", showInfo, children }) {
    return (
        <div className="kpi-card">
            <div className="kpi-header">
                {Icon && (
                    <div className="kpi-icon-badge" style={{ background: iconBg }}>
                        <Icon size={20} color={iconColor} />
                    </div>
                )}
                <div className="kpi-label-row">
                    <span className="kpi-label">{label}</span>
                    {showInfo && (
                        <button className="kpi-info-btn" aria-label={`More information about ${label}`}>
                            <Info size={16} />
                        </button>
                    )}
                </div>
            </div>
            <div className="kpi-value">{value}</div>
            {children}
        </div>
    );
}
