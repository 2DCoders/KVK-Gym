import axios from "axios";
import { getEnv } from "@/env";

const { API_URL } = getEnv();
const MEMBERSHIP_PLANS_API_URL = `${API_URL}gym/membership-plans/`;

const cashier = localStorage.getItem("cashier")
  ? JSON.parse(localStorage.getItem("cashier") as string)
  : null;
const token = cashier ? cashier.token : null;

export const getMembershipPlans = async () => {
  try {
    const response = await axios.get(`${MEMBERSHIP_PLANS_API_URL}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};