import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoginRequest, LoginResponse } from '@/types/auth';
import api from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';

interface AuthState {
	token: string | null;
	userId: string | null;
	loading: boolean;
	error: string | null;
	login: (credentials: LoginRequest) => Promise<void>;
	logout: () => void;
	setError: (message: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			userId: null,
			loading: false,
			error: null,

			login: async (credentials: LoginRequest) => {
				set({ loading: true, error: null });
				try {
					const res = await api.post<LoginResponse>(
						API_ENDPOINTS.login,
						credentials
					);

					set({
						token: res.data.access,
						userId: res.data.userId,
						loading: false,
					});
				} catch (err: any) {
					set({
						error:
							err.response?.data?.message ||
							err.message ||
							'Something went wrong',
						loading: false,
					});
				}
			},

			logout: () => {
				set({
					token: null,
					userId: null,
					error: null,
				});
			},

			setError: (message) => set({ error: message }),
		}),
		{
			name: 'auth-storage', // persistance dans localStorage
		}
	)
);
