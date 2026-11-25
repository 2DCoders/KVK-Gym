import axios from "axios";
import { getEnv } from "@/env";

const { API_URL } = getEnv();
const PAYMENTS_API_URL = `${API_URL}gym/payments/`;

const getToken = () => {
    const cashier = localStorage.getItem("cashier")
        ? JSON.parse(localStorage.getItem("cashier") as string)
        : null;

    return cashier ? cashier.token : null;
};

export const getPayments = async (startDate: string, endDate: string) => {
    const token = getToken();
    try {
        const query = `?from=${encodeURIComponent(startDate)}&to=${encodeURIComponent(endDate)}`;
        const response = await axios.get(`${PAYMENTS_API_URL}${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function downloadPaymentReceipt(id: string, dayPass: boolean) {
    const response = await axios.get<Blob>(`${PAYMENTS_API_URL}${id}/receipt`, {
        params: { dayPass }, headers: { Authorization: `Bearer ${getToken()}` }, responseType: "blob",
    });
    return response.data;
}
