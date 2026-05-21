import axios from "axios";
import { getEnv } from "@/env";

const { API_URL } = getEnv();
const MEMBERS_API_URL = `${API_URL}gym/members/`;

const cashier = localStorage.getItem("cashier")
  ? JSON.parse(localStorage.getItem("cashier") as string)
  : null;
const token = cashier ? cashier.token : null;

export const registerMember = async (memberData: any) => {
  try {
    const response = await axios.post(`${MEMBERS_API_URL}`, memberData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMembers = async () => {
  try {
    const response = await axios.get(`${MEMBERS_API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getMemberById = async (memberId: string) => {
  try {
    const response = await axios.get(`${MEMBERS_API_URL}${memberId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};