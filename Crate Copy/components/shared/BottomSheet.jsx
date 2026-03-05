import { useState, useEffect, useRef } from "react";

export function BottomSheet({ fullHeight, onClose, children }) {
    const [visible, setVisible] = useState(false);
    const sheetRef = useRef(null);
    const touchStartY = useRef(0);

    useEffect(() => {
        requestAnimationFrame(() => {
            setVisible(true);
            document.body.classList.add("sheet-open");
        });
        return () => document.body.classList.remove("sheet-open");
    }, []);

    const close = () => {
        setVisible(false);
        document.body.classList.remove("sheet-open");
        setTimeout(() => onClose?.(), 300);
    };

    const onTouchStart = (ev) => { touchStartY.current = ev.touches[0].clientY; };
    const onTouchEnd = (ev) => {
        const delta = ev.changedTouches[0].clientY - touchStartY.current;
        if (delta > 100) close();
    };

    return (
        <div className={`bottom-sheet-overlay ${visible ? "visible" : ""}`} onClick={close}>
            <div
                ref={sheetRef}
                className={`bottom-sheet ${fullHeight ? "full-height" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sheet-handle" onTouchStart={onTouchStart} onTouchMove={() => {}} onTouchEnd={onTouchEnd}>
                    <div className="handle-bar" />
                </div>
                <div className="sheet-content">{children}</div>
            </div>
        </div>
    );
}
