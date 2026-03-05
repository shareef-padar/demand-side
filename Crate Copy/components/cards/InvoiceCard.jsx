import { useRouter } from "@/contexts/RouterContext.jsx";
import { useService } from "@/contexts/ServicesContext.jsx";
import { useI18n } from "@/contexts/I18nContext.jsx";
import { INVOICE_STATUS, ROUTES } from "@/core/constants.js";
import { formatDate } from "@/utils/format.js";
import { FormattedCurrency } from "../../shared/FormattedCurrency.jsx";
import { CalendarBlank, Hourglass, Bell, Check } from "@phosphor-icons/react";
import { CargozCardIcon } from "../../shared/CargozCardIcon.jsx";
import { VisitorCardIcon } from "../../shared/VisitorCardIcon.jsx";
import { StatusBadge } from "../../shared/StatusBadge.jsx";
import { buildReminderLink } from "@/utils/whatsapp.js";

export function InvoiceCard({ item, isCz }) {
    const router = useRouter();
    const invoiceService = useService("invoice");
    const { t } = useI18n();
    const amountValue = isCz ? item.total : item.amount;
    const daysOverdue = invoiceService.getDaysOverdue(item.id);

    const goToDetail = () => router.navigate(ROUTES.BILL_DETAIL, { id: item.id });
    const remind = (e) => {
        e.stopPropagation();
        const url = buildReminderLink(item.customerName, item.id, item.amount);
        window.open(url, "_blank");
    };
    const markPaid = (e) => {
        e.stopPropagation();
        invoiceService.markOwnInvoicePaid(item.id);
    };
    const viewDetail = (e) => {
        e.stopPropagation();
        router.navigate(ROUTES.BILL_DETAIL, { id: item.id });
    };

    return (
        <div
            className={`invoice-card card clickable ${isCz ? "cargozCard" : "ownCard"}`}
            onClick={goToDetail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goToDetail()}
        >
            <div className="card-header">
                <div className="card-id-row">
                    {isCz ? (
                        <span className="source-logo-icon cargoz-logo"><CargozCardIcon size={48} /></span>
                    ) : (
                        <span className="source-logo-icon own-logo"><VisitorCardIcon size={48} /></span>
                    )}
                    <span className="card-id">{item.id}</span>
                </div>
                <StatusBadge status={item.status} />
            </div>
            <div className="card-body">
                <strong>{item.customerName}</strong>
                <div className="card-meta mt-2">
                    {isCz ? (
                        <span className="meta-item"><CalendarBlank size={14} />{formatDate(item.billDate)}</span>
                    ) : (
                        <>
                            <span className="meta-item"><CalendarBlank size={14} />{formatDate(item.dueDate)}</span>
                            {item.status === INVOICE_STATUS.OVERDUE && (
                                <span className="meta-item meta-item-danger"><Hourglass size={14} />{t("overdueByDays", { days: daysOverdue })}</span>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="card-footer">
                <span className="card-amount"><FormattedCurrency amount={amountValue} /></span>
                <div className="card-actions">
                    {!isCz && item.status !== INVOICE_STATUS.PAID && (
                        <>
                            <button type="button" className="btn btn-sm btn-outline" onClick={remind}><Bell size={14} />{t("remind")}</button>
                            <button type="button" className="btn btn-sm btn-primary" onClick={markPaid}><Check size={14} weight="bold" />{t("markAsPaid")}</button>
                        </>
                    )}
                    {isCz && <button type="button" className="btn btn-sm btn-ghost" onClick={viewDetail}>{t("view")}</button>}
                </div>
            </div>
        </div>
    );
}
