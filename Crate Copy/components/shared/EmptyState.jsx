import { FileText } from "@phosphor-icons/react";

export function EmptyState({ message = "No items found" }) {
    return (
        <div className="empty-state">
            <div className="empty-icon">
                <FileText size={48} color="var(--color-text-300)" weight="light" />
            </div>
            <p className="empty-text">{message}</p>
        </div>
    );
}
