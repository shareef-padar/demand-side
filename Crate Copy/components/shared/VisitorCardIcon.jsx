import visitorIcon from "@/assets/icons/Icon Shape.svg";

export function VisitorCardIcon({ size = 48, className }) {
    return (
        <img
            src={visitorIcon}
            alt="Visitor"
            width={size}
            height={size}
            className={className}
            style={{ display: "block", objectFit: "contain" }}
        />
    );
}
