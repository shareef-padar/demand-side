import { useRouter } from "@/contexts/RouterContext.jsx";
import { useI18n } from "@/contexts/I18nContext.jsx";
import { ROUTES, ORDER_STATUS, SOURCE } from "@/core/constants.js";
import { formatDate } from "@/utils/format.js";
import { FormattedCurrency } from "../../shared/FormattedCurrency.jsx";
import { CalendarBlank, Clock, Cube, Check } from "@phosphor-icons/react";
import { CargozCardIcon } from "../../shared/CargozCardIcon.jsx";
import { VisitorCardIcon } from "../../shared/VisitorCardIcon.jsx";
import { StatusBadge } from "../../shared/StatusBadge.jsx";

export function OrderCard({ order }) {
    const router = useRouter();
    const { t } = useI18n();

    const goToDetail = () => router.navigate(ROUTES.ORDER_DETAIL, { id: order.id });
    const viewAndAccept = (e) => {
        e.stopPropagation();
        router.navigate(ROUTES.ORDER_DETAIL, { id: order.id });
    };
    const checkIn = (e) => {
        e.stopPropagation();
        router.navigate(ROUTES.ORDER_CHECKIN, { id: order.id });
    };
    const checkOut = (e) => {
        e.stopPropagation();
        router.navigate(ROUTES.ORDER_CHECKOUT, { id: order.id });
    };

    return (
        <div
            className={`order-card card clickable ${order.status === ORDER_STATUS.COMPLETED ? "dimmed" : ""} ${order.source === SOURCE.CARGOZ ? "cargozCard" : ""} ${order.source === SOURCE.OWN ? "ownCard" : ""}`}
            onClick={goToDetail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goToDetail()}
        >
            <div className="card-header">
                <div className="card-id-row">
                    {order.source === SOURCE.CARGOZ ? (
                        <span className="source-logo-icon cargoz-logo"><CargozCardIcon size={48} /></span>
                    ) : (
                        <span className="source-logo-icon own-logo"><VisitorCardIcon size={48} /></span>
                    )}
                    <div className="card-id-name-stack">
                        <span className="card-id">{order.id}</span>
                        <strong className="card-customer-name">{order.customerName}</strong>
                    </div>
                </div>
                <StatusBadge status={order.status} />
            </div>
            <div className="card-body">
                {order.customerCompany && <div className="card-customer"><span className="text-muted">{order.customerCompany}</span></div>}
                <div className="card-meta">
                    <span className="meta-item"><CalendarBlank size={14} />{formatDate(order.startDate)}</span>
                    <span className="meta-item"><Clock size={14} />{order.durationMonths} {t("mo")}</span>
                    <span className="meta-item"><Cube size={14} />{order.space.quantity} {t("sqm")}</span>
                </div>
            </div>
            <div className="card-footer">
                <span className="card-amount"><FormattedCurrency amount={order.totalAmount} /></span>
                <div className="card-actions">
                    {order.status === ORDER_STATUS.NEW && <button type="button" className="btn btn-sm btn-primary" onClick={viewAndAccept}><Check size={14} weight="bold" />{t("viewAndAccept")}</button>}
                    {order.status === ORDER_STATUS.ACCEPTED && <button type="button" className="btn btn-sm btn-green" onClick={checkIn}>{t("checkIn")}</button>}
                    {order.status === ORDER_STATUS.ACTIVE && <button type="button" className="btn btn-sm btn-outline" onClick={checkOut}>{t("checkOut")}</button>}
                </div>
            </div>
        </div>
    );
}
