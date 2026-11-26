import { useState } from "react";
import PaymentReceiptViewer from "./payment-receipt-viewer";
import { createGymPaymentReceipt, type GymReceiptPayment } from "@/services/gym-payment-receipt";

export function usePaymentReceipt() {
  const [receipt, setReceipt] = useState<{ pdf: Blob; filename: string }>();
  const [error, setError] = useState(false);

  function previewPayment(payment: GymReceiptPayment | undefined, method: string) {
    setError(false);
    if (method !== "cash" && method !== "card") return;
    try {
      if (!payment) throw new Error("Missing receipt details.");
      const { doc, filename } = createGymPaymentReceipt(payment);
      setReceipt({ pdf: doc.output("blob"), filename });
    } catch {
      setError(true);
    }
  }

  const receiptPreview = (
    <>
      {error && <p role="alert" className="my-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
        Payment recorded. Download the receipt from Payments.
      </p>}
      {receipt && <PaymentReceiptViewer {...receipt} onClose={() => setReceipt(undefined)} />}
    </>
  );

  return { previewPayment, receiptPreview };
}
