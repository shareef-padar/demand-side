import { ShimmerSkeleton } from "./ShimmerSkeleton.jsx";

/** Generic shimmer loading skeleton that mimics screen structure */
export function ScreenShimmer() {
    return (
        <div className="screen-content shimmer-screen" aria-busy="true" aria-live="polite">
            {/* Page title row */}
            <div className="shimmer-row shimmer-title-row">
                <ShimmerSkeleton width="40%" height={28} />
                <ShimmerSkeleton width={100} height={36} />
            </div>

            {/* Tabs / Toggle row */}
            <div className="shimmer-row">
                <ShimmerSkeleton width="100%" height={44} />
            </div>

            {/* Cards / List */}
            <div className="shimmer-cards">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="shimmer-card">
                        <div className="shimmer-card-header">
                            <ShimmerSkeleton width={60} height={24} />
                            <ShimmerSkeleton width={80} height={20} />
                        </div>
                        <div className="shimmer-card-body">
                            <ShimmerSkeleton width="90%" height={16} />
                            <ShimmerSkeleton width="70%" height={16} />
                            <ShimmerSkeleton width="50%" height={16} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
