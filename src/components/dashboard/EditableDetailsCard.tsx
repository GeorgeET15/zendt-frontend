import { useState } from "react";

interface FieldConfig {
  key: string;
  label: string;
  type?: string;
}

interface EditableDetailsCardProps {
  title: string;
  description?: string;
  fields: FieldConfig[];
  initialValues: Record<string, string>;
}

export default function EditableDetailsCard({
  title,
  description,
  fields,
  initialValues,
}: EditableDetailsCardProps) {
  const [form, setForm] = useState(initialValues);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: event.target.value });
    };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <section className="rounded-[24px] mb-4 bg-[#1E1E1E] text-white p-6 space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-light tracking-tight text-white/80">{title}</h3>
          {description && <p className="text-xs text-white/60 mt-1">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="text-white/60 hover:text-white text-[13px] focus-visible:outline-none"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </header>

      <div className="space-y-4">
        {fields.map((field) => (
          <fieldset key={field.key} className="space-y-1">
            <legend className="text-[11px] uppercase tracking-wide text-white/50">
              {field.label}
            </legend>
            <input
              type={field.type ?? "text"}
              value={form[field.key] ?? ""}
              onChange={handleChange(field.key)}
              readOnly={!isEditing}
              className="w-full bg-transparent text-[14px] text-white/90 focus:outline-none border-b border-white/10 pb-2"
            />
          </fieldset>
        ))}
      </div>

      {isEditing && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-[10px] bg-white/10 px-5 py-2 text-[13px] text-white hover:bg-white/20"
          >
            Save
          </button>
        </div>
      )}
    </section>
  );
}
