'use client';

import { create } from 'zustand';
import { WateringNeedRequest, WateringNeedResponse } from '@/types/orther';
import api from '@/api/client';

interface WateringNeedState {
	needs: WateringNeedResponse[];
	loading: boolean;
	error: string | null;

	createNeed: (plantId: number, data: WateringNeedRequest) => Promise<void>;
	deleteNeed: (id: number) => Promise<void>;
}

export const useWateringNeedStore = create<WateringNeedState>((set, get) => ({
	needs: [],
	loading: false,
	error: null,

	createNeed: async (plantId, data) => {
		set({ loading: true, error: null });
		try {
			const res = await api.post<WateringNeedResponse>(
				`/watering-needs/create/${plantId}`,
				data
			);

			set((state) => ({
				needs: [...state.needs, res.data],
				loading: false,
			}));
		} catch (err: any) {
			set({
				error: err.response?.data?.message || 'Failed to create need',
				loading: false,
			});
		}
	},

	deleteNeed: async (id) => {
		set({ loading: true, error: null });
		try {
			await api.delete(`/watering-needs/${id}`);

			set((state) => ({
				needs: state.needs.filter((n) => n.id !== id),
				loading: false,
			}));
		} catch (err: any) {
			set({
				error: err.response?.data?.message || 'Failed to delete need',
				loading: false,
			});
		}
	},
}));
