'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlantResponse } from '@/types/orther';
import { useWateringHistoryStore } from '@/store/WateringHistory';
import { Droplet } from 'lucide-react';

interface WaterPlantModalProps {
	plant: PlantResponse;
}

export default function WaterPlantModal({ plant }: WaterPlantModalProps) {
	const { createHistory, loading, error } = useWateringHistoryStore();
	const [wateringDate, setWateringDate] = useState('');
	const [notes, setNotes] = useState('');

	const handleSubmit = async () => {
		if (!wateringDate) return;

		await createHistory(plant.id, {
			wateringDate,
			notes: notes || undefined,
		});

		setWateringDate('');
		setNotes('');
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="flex items-center gap-1 flex-1">
					<Droplet size={16} />
					Water Now
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Water {plant.name}</DialogTitle>
					<DialogDescription>
						Choose a date and optionally add a note
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 mt-4">
					<div className="flex flex-col gap-1">
						<label
							htmlFor="watering-date"
							className="text-sm font-medium"
						>
							Date & Time
						</label>
						<Input
							id="watering-date"
							type="datetime-local"
							value={wateringDate}
							onChange={(e) => setWateringDate(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="notes" className="text-sm font-medium">
							Note (optional)
						</label>
						<Input
							id="notes"
							placeholder="Add a note"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</div>

					{error && <p className="text-red-500">{error}</p>}

					<Button
						className="w-full"
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
