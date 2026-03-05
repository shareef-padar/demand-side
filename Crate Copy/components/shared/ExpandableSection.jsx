import { useState, useId } from "react";
import { CaretDown } from "@phosphor-icons/react";

export function ExpandableSection({ title, open = false, children }) {
    const [isOpen, setIsOpen] = useState(open);
    const bodyId = useId();
    return (
        <div className={`expandable-section ${isOpen ? "expanded" : ""}`}>
            <button
                type="button"
                className="expandable-header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={bodyId}
                aria-label={`${title}, ${isOpen ? "collapse" : "expand"} section`}
            >
                <span className="expandable-title">{title}</span>
                <CaretDown className="expand-icon" size={16} aria-hidden="true" />
            </button>
            <div id={bodyId} className="expandable-body" hidden={!isOpen}>{children}</div>
        </div>
    );
}
