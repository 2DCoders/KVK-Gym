import axios from "axios";
import { getEnv } from "@/env";

const { API_URL } = getEnv();
const MEMBERS_API_URL = `${API_URL}gym/members/`;

const cashier = localStorage.getItem("cashier")
  ? JSON.parse(localStorage.getItem("cashier") as string)
  : null;
const token = cashier ? cashier.token : null;

export const fingerPrintSave = async (memberId: string, fingerprintData: any) => {
    try {
        const response = await axios.post(`${MEMBERS_API_URL}${memberId}/fingerprints/`, fingerprintData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}