'use client';
import PlantCard from '@/components/PlantCard';
import PlantFormModal from '@/components/PlantFormModal';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import { usePlantStore } from '@/store/PlantStore';
import { useEffect, useState } from 'react';

export default function Plant() {
	const { plants, loading, error, fetchAllPlants } = usePlantStore();
	const userId = useAuthStore((state) => state.userId);
	const fetchPlantsByUser = usePlantStore((state) => state.fetchPlantsByUser);

	const [search, setSearch] = useState('');

	useEffect(() => {
		if (!userId) return;
		fetchPlantsByUser(userId);
		fetchAllPlants();
	}, [userId]);

	const filteredPlants = plants.filter((p) =>
		p.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="space-y-6">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
				Manage your Interior Planters
			</h1>

			<div className="flex max-w-lg items-center gap-2 pt-4">
				<Input
					placeholder="Search planter..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<PlantFormModal triggerLabel="New Planter" />
			</div>

			{loading && <p>Loading plants...</p>}
			{error && <p className="text-red-500">{error}</p>}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
				{filteredPlants.map((plant) => (
					<PlantCard plant={plant} key={plant.id} />
				))}
			</div>
		</div>
	);
}
