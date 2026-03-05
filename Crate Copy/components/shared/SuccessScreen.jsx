import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Local file for fast loading (no CDN delay)
const SUCCESS_LOTTIE_URL = "/success.lottie";

export function SuccessScreen({ title, subtitle, details, buttonLabel = "Done", onDone }) {
    return (
        <div className="success-screen anim-fade-in">
            <div className="success-content">
                <div className="success-icon anim-scale-in">
                    <DotLottieReact
                        src={SUCCESS_LOTTIE_URL}
                        autoplay
                        loop={false}
                        style={{ width: 160, height: 160 }}
                    />
                </div>
                <h2 className="success-title">{title}</h2>
                {subtitle && <p className="success-subtitle">{subtitle}</p>}
                {details?.length > 0 && (
                    <div className="success-details">
                        {details.map((d) => (
                            <div key={d.label} className="success-detail-row">
                                <span className="detail-label">{d.label}</span>
                                <span className="detail-value">{d.value}</span>
                            </div>
                        ))}
                    </div>
                )}
                <button type="button" className="btn btn-primary w-full mt-6" onClick={onDone}>{buttonLabel}</button>
            </div>
        </div>
    );
}
