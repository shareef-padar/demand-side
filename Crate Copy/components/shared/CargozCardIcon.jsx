import cargozIcon from "@/assets/icons/Cargoz Icon Shape.svg";

export function CargozCardIcon({ size = 48, className }) {
    return (
        <img
            src={cargozIcon}
            alt="Cargoz"
            width={size}
            height={size}
            className={className}
            style={{ display: "block", objectFit: "contain" }}
        />
    );
}
