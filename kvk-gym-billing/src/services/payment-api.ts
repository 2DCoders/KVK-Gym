import axios from "axios";
import { getEnv } from "@/env";

const { API_URL } = getEnv();
const MEMBERS_API_URL = `${API_URL}gym/members/`;

const getToken = () => {
    const cashier = localStorage.getItem("cashier")
        ? JSON.parse(localStorage.getItem("cashier") as string)
        : null;

    return cashier ? cashier.token : null;
};

type CashierPayment = {
    amount: number;
    paymentType: number;
    paymentStatus: number;
    transactionReference?: string | null;
    startDate?: string;
    endDate?: string;
};

export const processPayment = async (paymentData: CashierPayment, memberId: string) => {
    const storageKey = `gymCashierPayment:${memberId}:${paymentData.amount}:${paymentData.paymentType}:${paymentData.paymentStatus}`;
    const reference = paymentData.transactionReference ||
        localStorage.getItem(storageKey) || `GYM-CASHIER-${crypto.randomUUID()}`;
    localStorage.setItem(storageKey, reference);

    const response = await axios.post(`${MEMBERS_API_URL}${memberId}/payments/`, {
        ...paymentData,
        transactionReference: reference,
    }, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (localStorage.getItem(storageKey) === reference) {
        localStorage.removeItem(storageKey);
    }
    return response.data;
}
