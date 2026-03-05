import { useRouter } from "@/contexts/RouterContext.jsx";
import { CaretLeft } from "@phosphor-icons/react";

export function ScreenHeader({ title, children }) {
    const router = useRouter();
    return (
        <header className="screen-header">
            <button type="button" className="back-btn" aria-label="Back" onClick={() => router.back()}>
                <CaretLeft size={22} />
            </button>
            <h3 className="screen-title">{title}</h3>
            <div className="screen-header-right">{children}</div>
        </header>
    );
}
