export function encodeReceipt(file: File | undefined, required: boolean): Promise<string | undefined> {
  if (!file) return required ? Promise.reject(new Error("Upload a receipt before saving the payment.")) : Promise.resolve(undefined);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",", 2)[1]);
    reader.onerror = () => reject(new Error("Unable to read the receipt file."));
    reader.readAsDataURL(file);
  });
}
