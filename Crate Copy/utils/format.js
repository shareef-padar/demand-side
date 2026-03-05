const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const SAR = "\uFDFC"; // Rial sign - widely supported for SAR (U+FDFC)

export function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateShort(date) {
    if (!date) return "";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}`;
}

export function formatCurrency(amount) {
    if (amount == null) return `${SAR} 0`;
    return `${SAR} ${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatCurrencyShort(amount) {
    if (amount == null) return `${SAR} 0`;
    if (amount >= 1000000) {
        return `${SAR} ${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `${SAR} ${(amount / 1000).toFixed(1)}K`;
    }
    return formatCurrency(amount);
}

export function formatTimeAgo(date) {
    if (!date) return "";
    const now = new Date();
    const d = new Date(date);
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(date);
}

export function daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.ceil(Math.abs(d2 - d1) / 86400000);
}

export function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}

export function isOverdue(dueDate) {
    return new Date(dueDate) < new Date();
}

export function daysOverdue(dueDate) {
    const now = new Date();
    const due = new Date(dueDate);
    if (now <= due) return 0;
    return Math.ceil((now - due) / 86400000);
}
