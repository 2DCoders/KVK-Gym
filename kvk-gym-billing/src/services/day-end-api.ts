import axios from "axios";
import { getEnv } from "@/env";

const { API_URL } = getEnv();
const DAYEND_API_URL = `${API_URL}gym/dayend/`;

const getToken = () => {
  const cashier = localStorage.getItem("cashier")
    ? JSON.parse(localStorage.getItem("cashier") as string)
    : null;

  return cashier ? cashier.token : null;
};

export const getDayEndData = async (date: string) => {
  try {
    const response = await axios.get(`${DAYEND_API_URL}?date=${date}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};