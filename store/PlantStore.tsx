import api from '@/api/client';
import { PlantRequest, PlantResponse } from '@/types/orther';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlantState {
	plants: PlantResponse[];
	loading: boolean;
	error: string | null;

	// Actions
	fetchAllPlants: () => Promise<void>;
	fetchPlantsByUser: (userId: string) => Promise<void>;
	getPlantById: (id: number) => Promise<PlantResponse | null>;
	createPlant: (userId: string, plant: PlantRequest) => Promise<void>;
	deletePlant: (id: number) => Promise<void>;
	setError: (message: string | null) => void;
}

export const usePlantStore = create<PlantState>()(
	persist(
		(set, get) => ({
			plants: [],
			loading: false,
			error: null,

			fetchAllPlants: async () => {
				set({ loading: true, error: null });
				try {
					const res = await api.get<PlantResponse[]>('/plants');
					set({ plants: res.data, loading: false });
				} catch (err: any) {
					set({
						error: err.message || 'Failed to fetch plants',
						loading: false,
					});
				}
			},

			fetchPlantsByUser: async (userId: string) => {
				set({ loading: true, error: null });
				try {
					const res = await api.get<PlantResponse[]>(
						`/plants/user/${userId}`
					);
					set({ plants: res.data, loading: false });
				} catch (err: any) {
					set({
						error: err.message || 'Failed to fetch plants',
						loading: false,
					});
				}
			},

			getPlantById: async (id: number) => {
				set({ loading: true, error: null });
				try {
					const res = await api.get<PlantResponse>(`/plants/${id}`);
					set({ loading: false });
					return res.data;
				} catch (err: any) {
					set({
						error: err.message || 'Failed to fetch plant',
						loading: false,
					});
					return null;
				}
			},

			createPlant: async (userId: string, plant: PlantRequest) => {
				set({ loading: true, error: null });
				try {
					const res = await api.post<PlantResponse>(
						`/plants/create/${userId}`,
						plant
					);
					set((state) => ({
						plants: [...state.plants, res.data],
						loading: false,
					}));
				} catch (err: any) {
					set({
						error: err.message || 'Failed to create plant',
						loading: false,
					});
				}
			},

			deletePlant: async (id: number) => {
				set({ loading: true, error: null });
				try {
					await api.delete(`/plants/${id}`);
					set((state) => ({
						plants: state.plants.filter((p) => p.id !== id),
						loading: false,
					}));
				} catch (err: any) {
					set({
						error: err.message || 'Failed to delete plant',
						loading: false,
					});
				}
			},

			setError: (message) => set({ error: message }),
		}),
		{ name: 'plant-storage' }
	)
);
