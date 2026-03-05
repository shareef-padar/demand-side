import { SarIcon } from "./SarIcon.jsx";

function formatNumber(amount) {
    if (amount == null) return "0";
    return Number(amount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function FormattedCurrency({ amount, iconSize = 18, className }) {
    return (
        <span className={`formatted-currency ${className ?? ""}`}>
            <SarIcon size={iconSize} />
            <span>{formatNumber(amount)}</span>
        </span>
    );
}
