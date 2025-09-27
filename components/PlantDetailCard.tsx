'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Droplet, Calendar, Leaf, Trash2, Clock, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { PlantResponse, WateringHistoryRequest } from '@/types/orther';
import CreateWateringNeedModal from './WateringNeedFormModal';
import { useWateringHistoryStore } from '@/store/WateringHistory';
import WaterPlantModal from './WaterPlantModal';

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	});
};

export default function PlantCardDetail({ plant }: { plant: PlantResponse }) {
	const { createHistory } = useWateringHistoryStore();
	const [wateringH, setWateringH] = useState<WateringHistoryRequest>({
		wateringDate: '',
		notes: '',
	});

	// --- handlers ---
	const handleAddNeed = () => {};

	const handleDeleteNeed = (id: number) => {};

	const handleAddHistory = async () => {
		await createHistory(plant.id, wateringH);
	};

	const handleDeleteHistory = (id: number) => {};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Detail</Button>
			</DialogTrigger>

			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle>{plant.name}</DialogTitle>
					<DialogDescription>
						Details about your plant
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Image + Infos principales */}
					<div>
						<img
							src={'/cover-image.jpg'}
							alt={plant.name}
							width={600}
							height={400}
							className="w-full h-60 object-cover rounded-md"
						/>

						<div className="mt-3 space-y-2 text-sm">
							<p className="flex items-center gap-2 text-gray-700">
								<Leaf className="text-primary" size={16} />
								<span className="font-medium">
									Species:
								</span>{' '}
								{plant.espece}
							</p>
							<p className="flex items-center gap-2 text-gray-700">
								<Calendar className="text-blue-600" size={16} />
								<span className="font-medium">
									Purchased:
								</span>{' '}
								{formatDate(plant.purchaseDate)}
							</p>
						</div>
					</div>

					{/* Section Watering Needs */}
					<div>
						<div className="flex items-center justify-between">
							<h3 className="font-semibold text-lg flex items-center gap-2">
								<Clock className="text-primary" size={18} />
								Watering Needs
							</h3>
							<CreateWateringNeedModal plantId={plant.id} />
						</div>
						<div className="mt-2 space-y-2">
							{plant.wateringNeeds &&
								plant.wateringNeeds.length === 0 && (
									<p className="text-gray-400 text-sm">
										No watering needs defined
									</p>
								)}
							{plant.wateringNeeds &&
								plant.wateringNeeds.map((need) => (
									<div
										key={need.id}
										className="flex justify-between items-center border rounded-md p-2 text-sm"
									>
										<span>
											Every {need.frequencyInDays} days —{' '}
											{need.quantityInLiters} ml
										</span>
										<Button
											size="icon"
											variant="ghost"
											onClick={() =>
												handleDeleteNeed(need.id)
											}
										>
											<Trash2
												size={16}
												className="text-red-500"
											/>
										</Button>
									</div>
								))}
						</div>
					</div>

					{/* Section Watering History */}
					<div>
						<div className="flex items-center justify-between">
							<h3 className="font-semibold text-lg flex items-center gap-2">
								<Droplet className="text-blue-600" size={18} />
								Watering History
							</h3>
						</div>
						<div className="mt-2 space-y-2">
							{plant.wateringHistories &&
								plant.wateringHistories.length === 0 && (
									<p className="text-gray-400 text-sm">
										No watering history yet
									</p>
								)}
							{plant.wateringHistories &&
								plant.wateringHistories.map((history) => (
									<div
										key={history.id}
										className="flex justify-between items-center border rounded-md p-2 text-sm"
									>
										<span>
											{formatDate(history.wateringDate)} —{' '}
											{history.notes || 'No notes'}
										</span>
										<Button
											size="icon"
											variant="ghost"
											onClick={() =>
												handleDeleteHistory(history.id)
											}
										>
											<Trash2
												size={16}
												className="text-red-500"
											/>
										</Button>
									</div>
								))}
						</div>
					</div>

					{/* Actions */}
					<div className="flex gap-2 pt-2">
						<Button variant="outline" className="flex-1">
							<Edit2 />
							Edit
						</Button>

						<WaterPlantModal plant={plant} />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
