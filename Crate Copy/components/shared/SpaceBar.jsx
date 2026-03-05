import { useRef, useEffect, useState } from "react";
import { useI18n } from "@/contexts/I18nContext.jsx";
import { Package, Info, SlidersHorizontal } from "@phosphor-icons/react";

function formatNumber(n) {
    return Number(n).toLocaleString("en-US");
}

const DROP_ANIM_DURATION_MS = 450;

export function SpaceBar({ cargoz, own, available, total, showHeader, showAdjustButton, onAdjust, settingsMode, homeMode }) {
    const { t } = useI18n();
    const prevValues = useRef({ cargoz, own, available });
    const [dropActive, setDropActive] = useState(false);

    useEffect(() => {
        const changed = prevValues.current.cargoz !== cargoz ||
            prevValues.current.own !== own ||
            prevValues.current.available !== available;
        prevValues.current = { cargoz, own, available };
        if (changed) {
            setDropActive(true);
            const t = setTimeout(() => setDropActive(false), DROP_ANIM_DURATION_MS);
            return () => clearTimeout(t);
        }
    }, [cargoz, own, available]);
    const czPercent = ((cargoz / total) * 100).toFixed(1);
    const ownPercent = ((own / total) * 100).toFixed(1);
    const availPercentRaw = ((available / total) * 100).toFixed(1);
    const availPercent = Math.round((available / total) * 100);
    const restPercent = (((total - cargoz) / total) * 100).toFixed(1);
    const czAllocPercent = Math.round((cargoz / total) * 100);

    return (
        <div className="space-bar-container">
            {showHeader && (
                <div className="space-bar-header">
                    {!settingsMode && (
                        <div className="space-bar-title-row">
                            <Package size={16} />
                            <span className="space-bar-title">{t("availableSpace")}</span>
                            <button type="button" className="kpi-info-btn" aria-label="More information about available space">
                                <Info size={16} />
                            </button>
                        </div>
                    )}
                    {settingsMode && (
                        <div className="space-bar-subtitle-row">
                            <h4 className="space-bar-subtitle">{t("allocatedForCargoz")}</h4>
                            <button type="button" className="kpi-info-btn" aria-label="More information about allocation">
                                <Info size={16} />
                            </button>
                        </div>
                    )}
                    <div className="space-bar-summary">
                        <div className="space-bar-available-text">
                            {settingsMode ? (
                                <>
                                    <span className="space-bar-available-value">{formatNumber(cargoz)} <span className="space-bar-unit">{t("sqm")}</span></span>
                                    <span>{t("ofAllocated", { total: formatNumber(total) })}</span>
                                </>
                            ) : (
                                <>
                                    <span className="space-bar-available-value">{formatNumber(available)} <span className="space-bar-unit">{t("sqm")}</span></span>
                                    <span>{t("ofTotal", { total: formatNumber(total) })}</span>
                                </>
                            )}
                        </div>
                        <span className="space-bar-percent">{settingsMode ? czAllocPercent : availPercent}%</span>
                    </div>
                </div>
            )}
            {homeMode ? (
                <>
                    <div className={`space-bar ${dropActive ? "space-bar-drop" : ""}`}>
                        <div className="space-segment cargoz" style={{ width: `${czPercent}%` }} />
                        <div className="space-segment own" style={{ width: `${restPercent}%` }} />
                    </div>
                    <div className="space-legend">
                        <div className="legend-item"><span className="legend-dot cargoz" /><span>{t("occupiedByCargoz")} ({formatNumber(cargoz)} {t("sqm")})</span></div>
                        <div className="legend-item"><span className="legend-dot own" /><span>{t("availableForCargoz")} ({formatNumber(total - cargoz)} {t("sqm")})</span></div>
                    </div>
                </>
            ) : (
                <>
                    <div className={`space-bar ${dropActive ? "space-bar-drop" : ""}`}>
                        <div className="space-segment cargoz" style={{ width: `${czPercent}%` }} />
                        <div className="space-segment own" style={{ width: `${ownPercent}%` }} />
                        <div className="space-segment available" style={{ width: `${availPercentRaw}%` }} />
                    </div>
                    <div className="space-legend">
                        <div className="legend-item"><span className="legend-dot cargoz" /><span>{settingsMode ? t("occupiedByCargoz") : t("cargoz")} ({formatNumber(cargoz)} {t("sqm")})</span></div>
                        <div className="legend-item"><span className="legend-dot own" /><span>{settingsMode ? t("availableForCargoz") : t("myCustomer")} ({formatNumber(own)} {t("sqm")})</span></div>
                        <div className="legend-item"><span className="legend-dot available" /><span>{settingsMode ? t("reservedForUs") : t("available")} ({formatNumber(available)} {t("sqm")})</span></div>
                    </div>
                </>
            )}
            {showAdjustButton && (
                <button type="button" className="btn btn-outline w-full mt-3" onClick={onAdjust}>
                    <SlidersHorizontal size={16} />
                    {t("adjustSpaceAllocation")}
                </button>
            )}
        </div>
    );
}
