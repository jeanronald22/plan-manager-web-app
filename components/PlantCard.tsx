import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplet, Leaf, Calendar } from 'lucide-react';
import { PlantResponse } from '@/types/orther';
import PlantCardDetail from './PlantDetailCard';

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	});
};

export default function SimplePlantCard({ plant }: { plant: PlantResponse }) {
	return (
		<Card className="overflow-hidden border hover:shadow-md transition p-0">
			{/* Image */}
			<div className="h-40 w-full overflow-hidden">
				<img
					src={'/cover-image3.jpeg'}
					alt={plant.name}
					className="w-full h-full object-cover"
				/>
			</div>

			<CardContent className=" space-y-3 py-4">
				<div>
					<h3 className="font-semibold text-lg">{plant.name}</h3>
					<div className="flex items-center gap-1 text-sm text-gray-600">
						<Leaf size={14} className="text-primary" />
						{plant.espece}
					</div>
				</div>

				{/* Purchase Date */}
				<div className="flex items-center gap-2 text-gray-500 text-sm">
					<Calendar size={14} />
					<span>Purchased: {formatDate(plant.purchaseDate)}</span>
				</div>

				{/* Actions */}
				<div className="flex gap-2 pt-2">
					<PlantCardDetail plant={plant} />
					<Button className="flex-1 flex items-center gap-1 bg-primary">
						<Droplet size={16} />
						Water
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
