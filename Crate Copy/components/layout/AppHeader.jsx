import { useRouter } from "@/contexts/RouterContext.jsx";
import { useI18n } from "@/contexts/I18nContext.jsx";
import { useService } from "@/contexts/ServicesContext.jsx";
import { ROUTES } from "@/core/constants.js";
import { Globe, Bell, ChatCircle } from "@phosphor-icons/react";

export function AppHeader() {
    const router = useRouter();
    const i18n = useI18n();
    const profile = useService("profile");
    const p = profile.getProfile();

    const toggleLanguage = () => i18n.setLocale(i18n.locale === "en" ? "ar" : "en");

    return (
        <header className="app-header">
            <div className="header-top">
                <div className="header-brand">
                    <img className="brand-logo" src="/cargoz-logo.svg" alt="Cargoz Connect" width="94" height="29" />
                </div>
                <div className="header-actions">
                    <button type="button" className="lang-btn" aria-label={`Switch language to ${i18n.getAlternateLocaleLabel()}`} onClick={toggleLanguage}>
                        <span className="lang-text">{i18n.getAlternateLocaleLabel()}</span>
                        <Globe className="lang-icon" size={16} />
                    </button>
                </div>
            </div>
            <div className="header-warehouse-row">
                <div className="warehouse-info">
                    <h2 className="warehouse-name">{p.companyName}</h2>
                    <p className="warehouse-location">{p.address.city}, {p.address.region}</p>
                </div>
                <div className="header-row-actions">
                    <button type="button" className="header-icon-btn" aria-label="Notifications" onClick={() => router.navigate(ROUTES.NOTIFICATIONS)}>
                        <Bell size={20} />
                    </button>
                    <button type="button" className="header-icon-btn" aria-label="Support" onClick={() => window.open("https://wa.me/966500000000?text=Hi%2C%20I%20need%20help", "_blank")}>
                        <ChatCircle size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
