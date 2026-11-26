import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

export type GymReceiptPayment = {
  id: string;
  isDayPass?: boolean;
  hasReceipt?: boolean;
  memberFirstName?: string;
  memberLastName?: string;
  membershipNumber?: string;
  membershipPlanTitle?: string | null;
  amount: number;
  paymentType: number;
  paymentStatus: number;
  transactionReference?: string | null;
  createdAt?: string;
  startDate?: string | null;
  endDate?: string | null;
};

export type GymPaymentResult = { additionalData?: { payment?: GymReceiptPayment } };

export const PAID = 2;
export const gymPaymentMethod = (type: number) =>
  ["Unknown", "Cash", "Card", "Debit card", "PayPal", "Online", "Receipt upload"][type] ?? "Unknown";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Colombo", day: "numeric", month: "short", year: "numeric",
});
const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Colombo", hour: "numeric", minute: "2-digit",
});
const amountFormat = new Intl.NumberFormat("en-LK", {
  minimumFractionDigits: 2, maximumFractionDigits: 2,
});

function displayDate(value?: string | null) {
  const date = value ? new Date(value) : null;
  return date && Number.isFinite(date.getTime()) ? dateFormat.format(date) : undefined;
}

export function createGymPaymentReceipt(payment: GymReceiptPayment) {
  if (payment.paymentStatus !== PAID || !payment.id || !Number.isFinite(payment.amount)) {
    throw new Error("Missing paid transaction details.");
  }

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const right = doc.internal.pageSize.getWidth() - 48;
  const red = "#a6141f";
  const ink = "#1e293b";
  const muted = "#546070";
  const reference = payment.transactionReference || payment.id;
  const total = amountFormat.format(payment.amount);
  const issued = new Date();
  const member = [payment.memberFirstName, payment.memberLastName].filter(Boolean).join(" ");
  const plan = payment.isDayPass ? "Day pass" : payment.membershipPlanTitle || "Gym membership";
  const start = displayDate(payment.startDate);
  const end = displayDate(payment.endDate);
  const period = start && end && start !== end ? `${start} - ${end}` : start || end || "";

  function text(value: string, x: number, y: number, size: number, color = ink, bold = false) {
    doc.setFont("helvetica", bold ? "bold" : "normal").setFontSize(size).setTextColor(color);
    doc.text(value, x, y);
  }

  function field(title: string, value: string, x: number, y: number) {
    text(title, x, y, 9, muted, true);
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(ink);
    const lines: string[] = doc.splitTextToSize(value, 224);
    doc.text(lines, x, y + 18);
    return y + 18 + lines.length * 14;
  }

  doc.setProperties({ title: "KVK Arena Gym Payment Receipt" });
  doc.setFillColor(red).rect(48, 85, 32, 4, "F");
  text("KVK ARENA / GYM", 48, 112, 12, red, true);
  text("Payment receipt", 48, 150, 29, ink, true);
  doc.setFillColor("#e3f2e8").rect(right - 69, 131, 69, 24, "F");
  text("PAID", right - 48, 147, 10, "#1c5733", true);
  doc.setDrawColor("#d9dee5").line(48, 174, right, 174);

  const referenceEnd = field("PAYMENT REFERENCE", reference, 48, 204);
  field("ISSUED", `${dateFormat.format(issued)}, ${timeFormat.format(issued)}`, 315, 204);
  const memberEnd = field("MEMBER", member || payment.membershipNumber || "Gym customer", 48, referenceEnd + 20);
  const methodEnd = field("PAYMENT METHOD", gymPaymentMethod(payment.paymentType), 315, referenceEnd + 20);
  const detailsY = Math.max(memberEnd, methodEnd) + 20;
  const numberEnd = payment.membershipNumber ? field("MEMBERSHIP NO.", payment.membershipNumber, 48, detailsY) : detailsY;
  const paymentDate = displayDate(payment.createdAt);
  const dateEnd = paymentDate ? field("PAYMENT DATE", paymentDate, 315, detailsY) : detailsY;

  autoTable(doc, {
    startY: Math.max(numberEnd, dateEnd) + 24,
    margin: { left: 48, right: 48 },
    head: [["Description", "Period", "Amount (LKR)"]],
    body: [[plan, period, total]],
    foot: [[{ content: "Total paid", colSpan: 2 }, { content: `LKR ${total}`, styles: { halign: "right" } }]],
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 9, textColor: ink },
    headStyles: { fillColor: "#eff1f3", fontStyle: "bold" },
    bodyStyles: { lineColor: "#d9dee5", lineWidth: { bottom: 0.5 } },
    footStyles: { fillColor: "#faeeee", textColor: red, fontStyle: "bold", fontSize: 12 },
    columnStyles: { 2: { halign: "right" } },
  });

  text("Please keep this receipt for your records.", 48, doc.internal.pageSize.getHeight() - 36, 10, muted);
  return { doc, filename: `gym-receipt-${payment.id}.pdf` };
}
