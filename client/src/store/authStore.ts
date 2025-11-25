import axios from "axios";
import { create } from "zustand";

interface user {
  username: string;
  email: string;
  name: string;
  isVarifed: string;
  _id: string;
}

interface authStore {
  user: user | null;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;

  signup: (
    username: string,
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
}

const url = "http://localhost:5000/api/v1/users";
axios.defaults.withCredentials = true;
const authStore = create<authStore>((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,

  signup: async (username, name, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${url}/signup`, {
        username,
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {
        set({
          user: null,
          error: error.response?.data?.message || "Signup Failed",
          isLoading: false,
          isAuthenticated: false,
        });
      } else {
        set({
          user: null,
          error: "Unknown error occurred",
          isLoading: false,
          isAuthenticated: false,
        });
      }
      throw error;
    }
  },
}));


export default authStore;