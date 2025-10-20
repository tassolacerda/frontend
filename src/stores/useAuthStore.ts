import { create } from 'zustand';
import { api, authApi } from '@/lib/api';

export type UserType = 'REAL_ESTATE' | 'BUYER' | 'ADMIN';
export type KYCStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

interface User {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  userType: UserType;
  cpf?: string | null;
  cnpj?: string | null;
  phone?: string | null;
  walletAddress?: string | null;
  balance?: string;
  kycStatus: KYCStatus;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  userType: UserType;
  cpf?: string;
  cnpj?: string;
  phone?: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Better Auth uses /api/auth routes (not /api/v1/auth)
      await authApi.post('/sign-in/email', {
        email,
        password
      });

      // Fetch user data after login
      const userResponse = await api.get('/me');

      const user = userResponse.data.data.user;
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true });
    try {
      // Use custom register endpoint that handles Better Auth + custom fields
      const response = await api.post('/register', {
        email: data.email,
        password: data.password,
        name: data.name,
        userType: data.userType,
        cpf: data.cpf,
        cnpj: data.cnpj,
        phone: data.phone
      });

      const { user } = response.data.data;
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.post('/sign-out', {});
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      // Clear state anyway
      set({ user: null, isAuthenticated: false });
    }
  },

  fetchUser: async () => {
    try {
      const response = await api.get('/me', {
        withCredentials: true
      });
      const user = response.data.data.user;
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ user: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    try {
      const response = await api.get('/me', {
        withCredentials: true
      });
      const user = response.data.data.user;
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
