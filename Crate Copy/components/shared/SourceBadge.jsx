import { SOURCE } from "@/core/constants.js";

export function SourceBadge({ source }) {
    return (
        <span className={`source-badge source-${source}`}>
            {source === SOURCE.CARGOZ ? (
                <>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <rect width="12" height="12" rx="3" />
                        <text x="2" y="9" fontSize="7" fill="white" fontWeight="700">CZ</text>
                    </svg>
                    Cargoz
                </>
            ) : (
                <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 7V5a4 4 0 00-8 0v2" />
                    </svg>
                    Own
                </>
            )}
        </span>
    );
}
