import { create } from "zustand";
import axios from "axios";

const url = "http://localhost:5000/api/v1/users/";

// create auth store
export const authStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  // signup
  signup: async (name, username, email, password) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${url}signup`, {
        name,
        username,
        email,
        password,
      });

      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.log(error);

      set({
        error: error?.response?.data.message || "Error to Sign Up",
        isLoading: false,
      });
      throw error;
    }
  },
}));
