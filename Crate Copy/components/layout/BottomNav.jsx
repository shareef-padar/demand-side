import { useState } from "react";
import { useRouter } from "@/contexts/RouterContext.jsx";
import { useI18n } from "@/contexts/I18nContext.jsx";
import { useServices, useService } from "@/contexts/ServicesContext.jsx";
import { ROUTES, ROUTE_TABS } from "@/core/constants.js";
import { House, FileText, Users, Receipt, SlidersHorizontal } from "@phosphor-icons/react";

const BOUNCE_DURATION_MS = 400;

const tabsConfig = [
    { id: "home", routeKey: "HOME", labelKey: "navHome", Icon: House },
    { id: "orders", routeKey: "ORDERS", labelKey: "navOrders", Icon: FileText },
    { id: "visits", routeKey: "VISITS", labelKey: "navVisits", Icon: Users },
    { id: "bills", routeKey: "BILLS", labelKey: "navBills", Icon: Receipt },
    { id: "settings", routeKey: "SETTINGS", labelKey: "navSettings", Icon: SlidersHorizontal },
];

export function BottomNav() {
    const router = useRouter();
    const { t } = useI18n();
    const { refreshKey } = useServices();
    const orderService = useService("order");
    const visitService = useService("visit");
    const activeTab = ROUTE_TABS[router.state.route] || "home";
    const [bouncingTab, setBouncingTab] = useState(null);

    const handleTabClick = (tabId, route) => {
        setBouncingTab(tabId);
        router.navigate(route);
        setTimeout(() => setBouncingTab(null), BOUNCE_DURATION_MS);
    };

    const tabs = tabsConfig.map(({ id, routeKey, labelKey, Icon }) => {
        const route = ROUTES[routeKey];
        const label = t(labelKey);
        const badge = id === "orders" ? orderService.getNewCount() : id === "visits" ? visitService.getPendingCount() : 0;
        return { id, route, label, Icon, badge };
    });

    return (
        <div className="bottom-nav-wrapper">
            <nav className="bottom-nav" aria-label="Main navigation">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        className={`nav-tab ${activeTab === tab.id ? "active" : ""} ${bouncingTab === tab.id ? "nav-tab-bounce" : ""}`}
                        onClick={() => handleTabClick(tab.id, tab.route)}
                        aria-label={tab.badge > 0 ? `${tab.label}, ${tab.badge} new` : tab.label}
                        aria-current={activeTab === tab.id ? "page" : undefined}
                    >
                        <div className="nav-icon-pill"><div className="nav-icon"><tab.Icon size={24} /></div></div>
                        {tab.badge > 0 && <span className="nav-badge">{tab.badge}</span>}
                        <span className="nav-label">{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
