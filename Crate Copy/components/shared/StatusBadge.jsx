import { useI18n } from "@/contexts/I18nContext.jsx";
import { STATUS_COLORS, ORDER_STATUS, VISIT_STATUS, BILL_STATUS, INVOICE_STATUS } from "@/core/constants.js";

const STATUS_TO_I18N = {
    [ORDER_STATUS.NEW]: "pending",
    [ORDER_STATUS.ACCEPTED]: "accepted",
    [ORDER_STATUS.ACTIVE]: "active",
    [ORDER_STATUS.COMPLETED]: "completed",
    [VISIT_STATUS.PENDING]: "pending",
    [VISIT_STATUS.ACCEPTED]: "accepted",
    [VISIT_STATUS.DONE]: "completed",
    [VISIT_STATUS.NO_SHOW]: "noShow",
    [VISIT_STATUS.REJECTED]: "rejected",
    [BILL_STATUS.WAITING_FOR_INVOICE]: "waitingForInvoice",
    [BILL_STATUS.PENDING_APPROVAL]: "pendingApproval",
    [BILL_STATUS.APPROVED_FOR_PAYMENT]: "approvedForPaymentStatus",
    [BILL_STATUS.PAID]: "paid",
    [INVOICE_STATUS.UNPAID]: "unpaid",
    [INVOICE_STATUS.OVERDUE]: "overdue",
    [INVOICE_STATUS.PAID]: "paid",
};

export function StatusBadge({ status }) {
    const { t } = useI18n();
    const key = STATUS_TO_I18N[status];
    const label = key ? t(key) : status;
    const color = STATUS_COLORS[status] || "gray";
    return <span className={`status-badge status-${color}`}>{label}</span>;
}
