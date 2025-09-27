'use client';

import { create } from 'zustand';
import {
	WateringHistoryRequest,
	WateringHistoryResponse,
} from '@/types/orther';
import api from '@/api/client';

interface WateringHistoryState {
	loading: boolean;
	error: string | null;
	history: WateringHistoryResponse | null;
	createHistory: (
		plantId: number,
		history: WateringHistoryRequest
	) => Promise<void>;
}

export const useWateringHistoryStore = create<WateringHistoryState>((set) => ({
	loading: false,
	error: null,
	history: null,

	createHistory: async (plantId, history) => {
		set({ loading: true, error: null });
		try {
			const res = await api.post<WateringHistoryResponse>(
				`/watering-history/create/${plantId}`,
				history
			);
			set({ history: res.data, loading: false });
		} catch (error: any) {
			set({
				error:
					error.response?.data?.message || 'Failed to create history',
				loading: false,
			});
		}
	},
}));
