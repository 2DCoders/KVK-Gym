import { useId, useState } from "react";
import { FileText, Upload, X } from "lucide-react";

export default function PaymentReceiptField({ file, onChange, disabled, required }: {
  file?: File; onChange: (file: File | undefined) => void; disabled?: boolean; required?: boolean;
}) {
  const [error, setError] = useState("");
  const inputId = useId();
  const Icon = file ? FileText : Upload;
  return <div className="my-3">
    <div className="mb-2 flex items-baseline gap-2">
      <label htmlFor={inputId} className="text-sm font-semibold text-slate-900">Payment receipt</label>
      <span className="text-xs text-slate-500">{required ? "Required" : "Optional"}</span>
    </div>
    <div className={`flex flex-wrap items-center gap-3 rounded-xl border p-3 ${file ? "border-slate-200 bg-white" : "border-dashed border-slate-300 bg-slate-50/70"}`}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
        <Icon size={17} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        {file && <p className="break-all text-sm font-medium text-slate-900">{file.name}</p>}
        <p className="text-xs text-slate-500">{file ? `${Math.max(1, Math.round(file.size / 1024))} KB` : "PDF, PNG or JPEG · Up to 5 MB"}</p>
      </div>
      <div className="flex items-center gap-2">
      <input id={inputId} type="file" accept=".pdf,.png,.jpg,.jpeg" disabled={disabled}
        className="peer sr-only"
        onChange={(event) => {
          const selected = event.target.files?.[0];
          event.target.value = "";
          if (!selected) return;
          if (selected.size < 1 || selected.size > 5 * 1024 * 1024 || !/\.(pdf|png|jpe?g)$/i.test(selected.name)) {
            setError("Choose a PDF, PNG or JPEG up to 5 MB.");
            return;
          }
          setError("");
          onChange(selected);
        }} />
      <label htmlFor={inputId} className="inline-flex min-h-9 cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-blue-700 hover:bg-blue-50 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
        {file ? "Replace file" : "Choose file"}
      </label>
      {file && <button type="button" aria-label="Remove receipt" disabled={disabled}
        onClick={() => { setError(""); onChange(undefined); }}
        className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50">
        <X size={16} aria-hidden="true" />
      </button>}
      </div>
    </div>
    {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
  </div>;
}
