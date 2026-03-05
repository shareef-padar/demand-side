import { useI18n } from "@/contexts/I18nContext.jsx";
import { Info, CaretRight } from "@phosphor-icons/react";

export function ActionCard({ count, text, onClick }) {
    const { t } = useI18n();
    return (
        <div className="action-row" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick()}>
            <div className="action-row-left">
                <Info className="action-alert-icon" size={16} />
                <span className="action-row-text">{count} {text}</span>
            </div>
            <button className="action-view-link" type="button">
                {t("view")}
                <CaretRight className="action-view-chevron" size={16} />
            </button>
        </div>
    );
}
