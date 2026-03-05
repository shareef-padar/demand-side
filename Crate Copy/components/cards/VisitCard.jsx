import { useRouter } from "@/contexts/RouterContext.jsx";
import { useI18n } from "@/contexts/I18nContext.jsx";
import { useService } from "@/contexts/ServicesContext.jsx";
import { ROUTES, VISIT_STATUS, SOURCE } from "@/core/constants.js";
import { FormattedCurrency } from "../../shared/FormattedCurrency.jsx";
import { X, Check } from "@phosphor-icons/react";
import { CargozCardIcon } from "../../shared/CargozCardIcon.jsx";
import { VisitorCardIcon } from "../../shared/VisitorCardIcon.jsx";
import { StatusBadge } from "../../shared/StatusBadge.jsx";

export function VisitCard({ visit }) {
    const router = useRouter();
    const visitService = useService("visit");
    const { t } = useI18n();

    const goToDetail = () => router.navigate(ROUTES.VISIT_DETAIL, { id: visit.id });
    const accept = (e) => {
        e.stopPropagation();
        visitService.acceptVisit(visit.id);
    };
    const reject = (e) => {
        e.stopPropagation();
        visitService.rejectVisit(visit.id);
    };
    const noShow = (e) => {
        e.stopPropagation();
        visitService.markNoShow(visit.id);
    };
    const markDone = (e) => {
        e.stopPropagation();
        router.navigate(ROUTES.VISIT_MARKDONE, { id: visit.id });
    };
    const viewDetail = (e) => {
        e.stopPropagation();
        router.navigate(ROUTES.VISIT_DETAIL, { id: visit.id });
    };

    return (
        <div
            className={`visit-card card clickable ${visit.source === SOURCE.CARGOZ ? "cargoz-card" : ""} ${visit.source === SOURCE.OWN ? "own-card" : ""}`}
            onClick={goToDetail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goToDetail()}
        >
            <div className="card-header">
                <div className="card-id-row">
                    {visit.source === SOURCE.CARGOZ ? (
                        <span className="source-logo-icon cargoz-logo"><CargozCardIcon size={48} /></span>
                    ) : (
                        <span className="source-logo-icon own-logo"><VisitorCardIcon size={48} /></span>
                    )}
                    <div className="card-id-name-stack">
                        <span className="card-id">{visit.id}</span>
                        <strong className="card-customer-name">{visit.customerName}</strong>
                    </div>
                </div>
                <StatusBadge status={visit.status} />
            </div>
            <div className="card-body">
                {visit.customerCompany && <div className="card-customer"><span className="text-muted">{visit.customerCompany}</span></div>}
                {visit.saleOrderId && <div className="card-meta"><span className="do-badge">DO: {visit.saleOrderId}</span></div>}
            </div>
            <div className="card-footer">
                <span className="card-amount"><FormattedCurrency amount={visit.serviceAmount} /></span>
                <div className="card-actions">
                    {visit.status === VISIT_STATUS.PENDING && (
                        <>
                            <button type="button" className="btn btn-sm btn-outline" onClick={reject}><X size={14} weight="bold" />{t("reject")}</button>
                            <button type="button" className="btn btn-sm btn-primary" onClick={accept}><Check size={14} weight="bold" />{t("accept")}</button>
                        </>
                    )}
                    {visit.status === VISIT_STATUS.ACCEPTED && (
                        <>
                            <button type="button" className="btn btn-sm btn-ghost" onClick={noShow}>{t("noShow")}</button>
                            <button type="button" className="btn btn-sm btn-primary" onClick={markDone}>{t("markDone")}</button>
                        </>
                    )}
                    {visit.status === VISIT_STATUS.REJECTED && (
                        <button type="button" className="btn btn-sm btn-ghost" onClick={viewDetail}>{t("view")}</button>
                    )}
                </div>
            </div>
        </div>
    );
}
