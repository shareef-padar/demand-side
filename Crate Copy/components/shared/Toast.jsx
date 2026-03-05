import { useNotification } from "@/contexts/NotificationContext.jsx";

export function Toast() {
    const { getToasts } = useNotification();
    const toasts = getToasts();

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast anim-slide-up toast-${toast.type}`}>
                    {toast.type === "success" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                    {toast.type === "error" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    )}
                    <span>{toast.message}</span>
                </div>
            ))}
        </div>
    );
}
