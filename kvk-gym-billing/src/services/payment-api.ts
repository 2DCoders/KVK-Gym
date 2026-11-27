import axios from "axios";
import { getEnv } from "@/env";
import type { GymPaymentResult } from "./gym-payment-receipt";

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
    trainerDiscount?: number;
    trainerRegistrationDiscount?: number;
    paymentType: number;
    paymentStatus: number;
    transactionReference?: string | null;
    startDate?: string;
    endDate?: string;
    receipt?: string;
};

export const processPayment = async (paymentData: CashierPayment, memberId: string) => {
    const storageKey = `gymCashierPayment:${memberId}:${paymentData.amount}:${paymentData.paymentType}:${paymentData.paymentStatus}`;
    const previousKey = `gymCashierPayment:${memberId}:${paymentData.amount}:${paymentData.paymentType}:1`;
    const reference = paymentData.transactionReference ||
        localStorage.getItem(storageKey) || localStorage.getItem(previousKey) || `GYM-CASHIER-${crypto.randomUUID()}`;
    localStorage.setItem(storageKey, reference);

    const response = await axios.post<GymPaymentResult>(`${MEMBERS_API_URL}${memberId}/payments/`, {
        ...paymentData,
        transactionReference: reference,
    }, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (localStorage.getItem(storageKey) === reference) {
        localStorage.removeItem(storageKey);
    }
    if (localStorage.getItem(previousKey) === reference) localStorage.removeItem(previousKey);
    return response.data;
}
