'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PlantForm from './PlantForm';
import { PlantRequest } from '@/types/orther';
import { Edit2, PlusCircle } from 'lucide-react';

interface PlantFormModalProps {
	triggerLabel: string;
	initialData?: PlantRequest;
}

export default function PlantFormModal({
	triggerLabel,
	initialData,
}: PlantFormModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					{initialData ? <Edit2 /> : <PlusCircle />}
					{triggerLabel}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>
						{initialData ? 'Update Plant' : 'Create Plant'}
					</DialogTitle>
				</DialogHeader>

				<PlantForm initialData={initialData} />
			</DialogContent>
		</Dialog>
	);
}
