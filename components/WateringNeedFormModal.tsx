'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWateringNeedStore } from '@/store/wateringNeedStore';
import { PlusCircle } from 'lucide-react';

export default function CreateWateringNeedModal({
	plantId,
}: {
	plantId: number;
}) {
	const { createNeed, loading } = useWateringNeedStore();
	const [frequencyInDays, setFrequencyInDays] = useState<number>(0);
	const [quantityInLiters, setQuantityInLiters] = useState<number>(0);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createNeed(plantId, { frequencyInDays, quantityInLiters });
		setFrequencyInDays(0);
		setQuantityInLiters(0);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'outline'}>
					<PlusCircle /> Add
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Create Watering Need</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="frequency">Frequency (days)</Label>
						<Input
							id="frequency"
							type="number"
							value={frequencyInDays}
							onChange={(e) =>
								setFrequencyInDays(Number(e.target.value))
							}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="quantity">Quantity (liters)</Label>
						<Input
							id="quantity"
							type="number"
							value={quantityInLiters}
							onChange={(e) =>
								setQuantityInLiters(Number(e.target.value))
							}
							required
						/>
					</div>

					<Button type="submit" disabled={loading} className="w-full">
						{loading ? 'Saving...' : 'Save'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
