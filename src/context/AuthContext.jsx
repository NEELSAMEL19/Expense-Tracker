import { createContext, useContext, useEffect, useState } from "react";
import {
  getProfileService,
  loginService,
  registerService,
  logoutService,
} from "../Services/AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check auth status on app start (cookie is sent automatically)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getProfileService();
        const profile = res?.data; // unwrap { success, message, data }
        if (!profile || !profile._id) {
          setUser(null);
          return;
        }
        setUser(profile);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const storeAuthData = (userInfoRaw) => {
    const userInfo = {
      _id: userInfoRaw._id,
      name: userInfoRaw.name,
      email: userInfoRaw.email,
      avatar: userInfoRaw.avatar,
      role: userInfoRaw.role,
    };
    setUser(userInfo);

    // 🔹 Notify all components that authentication is updated
    window.dispatchEvent(new Event("auth-updated"));
  };

  const login = async (email, password) => {
    const res = await loginService({ email, password });
    storeAuthData(res.data); // unwrap
    return res.data;
  };

  const register = async (formData) => {
    const res = await registerService(formData);
    storeAuthData(res.data); // unwrap
    return res.data;
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      window.dispatchEvent(new Event("auth-updated"));
    }
  };

  const refreshProfile = async () => {
    try {
      const res = await getProfileService();
      setUser(res?.data); // unwrap
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
