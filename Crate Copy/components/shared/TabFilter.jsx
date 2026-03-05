import { useState, useRef, useEffect } from "react";

const TAB_PRESS_DURATION_MS = 250;

export function TabFilter({ tabs, active, onSelect }) {
    const [pressedTab, setPressedTab] = useState(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef([]);
    const activeIndex = tabs.findIndex((t) => t.value === active);

    useEffect(() => {
        if (activeIndex < 0) return;
        const el = tabsRef.current[activeIndex];
        if (el) {
            setIndicatorStyle({ left: el.offsetLeft, width: el.clientWidth });
        }
    }, [activeIndex, tabs]);

    useEffect(() => {
        if (activeIndex < 0) return;
        const el = tabsRef.current[activeIndex];
        if (!el) return;
        const ro = new ResizeObserver(() => {
            setIndicatorStyle({ left: el.offsetLeft, width: el.clientWidth });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [activeIndex]);

    const handleTabClick = (value) => {
        setPressedTab(value);
        onSelect(value);
        setTimeout(() => setPressedTab(null), TAB_PRESS_DURATION_MS);
    };

    return (
        <div className="tab-filter">
            <span
                className="tab-filter-slider"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                aria-hidden
            />
            {tabs.map((tab, index) => (
                <button
                    key={tab.value}
                    ref={(el) => (tabsRef.current[index] = el)}
                    type="button"
                    className={`tab-underline ${tab.value === active ? "active" : ""} ${pressedTab === tab.value ? "tab-underline-press" : ""}`}
                    onClick={() => handleTabClick(tab.value)}
                    aria-pressed={tab.value === active}
                    aria-label={tab.count !== undefined && tab.count > 0 ? `${tab.label}, ${tab.count}` : tab.label}
                >
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                        <span className="tab-count">{tab.count}</span>
                    )}
                </button>
            ))}
        </div>
    );
}
