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
import {
	Droplet,
	Calendar,
	Leaf,
	Trash2,
	PlusCircle,
	Clock,
} from 'lucide-react';
import { useState } from 'react';
import {
	PlantResponse,
	WateringHistoryResponse,
	WateringNeedResponse,
} from '@/types/orther';

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	});
};

export default function PlantCardDetail({ plant }: { plant: PlantResponse }) {
	const [wateringNeeds, setWateringNeeds] = useState<WateringNeedResponse[]>(
		plant.wateringNeeds
	);

	const [wateringHistories, setWateringHistories] = useState<
		WateringHistoryResponse[]
	>(plant.wateringHistories);

	// --- handlers ---
	const handleAddNeed = () => {};

	const handleDeleteNeed = (id: number) => {};

	const handleAddHistory = () => {};

	const handleDeleteHistory = (id: number) => {};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Detail</Button>
			</DialogTrigger>

			<DialogContent className="max-w-2xl">
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
							src={plant.imageUrl || '/api/placeholder/600/400'}
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
							<Button
								size="sm"
								variant="outline"
								onClick={handleAddNeed}
							>
								<PlusCircle size={16} className="mr-1" />
								Add
							</Button>
						</div>
						<div className="mt-2 space-y-2">
							{wateringNeeds.length === 0 && (
								<p className="text-gray-400 text-sm">
									No watering needs defined
								</p>
							)}
							{wateringNeeds.map((need) => (
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
							<Button
								size="sm"
								variant="outline"
								onClick={handleAddHistory}
							>
								<PlusCircle size={16} className="mr-1" />
								Add
							</Button>
						</div>
						<div className="mt-2 space-y-2">
							{wateringHistories.length === 0 && (
								<p className="text-gray-400 text-sm">
									No watering history yet
								</p>
							)}
							{wateringHistories.map((history) => (
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
							Edit
						</Button>
						<Button className="flex-1 flex items-center gap-1 bg-primary ">
							<Droplet size={16} /> Water Now
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
