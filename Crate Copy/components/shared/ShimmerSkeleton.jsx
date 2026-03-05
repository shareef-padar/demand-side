export function ShimmerSkeleton({ className = "", width, height, rounded = true }) {
    const style = {};
    if (width) style.width = typeof width === "number" ? `${width}px` : width;
    if (height) style.height = typeof height === "number" ? `${height}px` : height;

    return (
        <div
            className={`shimmer-skeleton ${rounded ? "shimmer-skeleton-rounded" : ""} ${className}`.trim()}
            style={style}
            aria-hidden
        />
    );
}
