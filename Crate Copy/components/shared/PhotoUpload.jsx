import { X, Plus } from "@phosphor-icons/react";

export function PhotoUpload({ photos, onChange }) {
    const addPhoto = () => {
        const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23E4E8ED' width='100' height='100'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%237A8696' font-size='12'%3EPhoto%3C/text%3E%3C/svg%3E";
        onChange([...(photos || []), placeholder]);
    };
    const removePhoto = (index) => {
        onChange((photos || []).filter((_, i) => i !== index));
    };
    return (
        <div className="photo-upload">
            <label className="field-label">Photos</label>
            <div className="photo-grid">
                {(photos || []).map((photo, i) => (
                    <div key={i} className="photo-thumb">
                        <img src={photo} alt="Photo" />
                        <button type="button" className="photo-remove" aria-label="Remove photo" onClick={() => removePhoto(i)}>
                            <X size={14} color="white" weight="bold" />
                        </button>
                    </div>
                ))}
                <button type="button" className="photo-add" aria-label="Add photo" onClick={addPhoto}>
                    <Plus size={24} />
                    <span>Add Photo</span>
                </button>
            </div>
            <p className="photo-hint">PNG or JPG | Max. File Size: 30MB</p>
        </div>
    );
}
