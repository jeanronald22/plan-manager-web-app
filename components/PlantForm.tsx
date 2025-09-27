'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Espece, PlantRequest } from '@/types/orther';
import { usePlantStore } from '@/store/PlantStore';
import { useAuthStore } from '@/store/authStore';

interface PlantFormProps {
	initialData?: PlantRequest;
}

export default function PlantForm({ initialData }: PlantFormProps) {
	const [name, setName] = useState(initialData?.name || '');
	const [purchaseDate, setPurchaseDate] = useState(
		initialData?.purchaseDate || ''
	);
	const [espece, setEspece] = useState<Espece>(
		initialData?.espece || Espece.MONSTERA
	);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string>(initialData?.imageUrl || '');
	const { createPlant } = usePlantStore();
	const userId = useAuthStore((state) => state.userId);

	// Gérer la prévisualisation
	useEffect(() => {
		if (!imageFile) return;
		const objectUrl = URL.createObjectURL(imageFile);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [imageFile]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setImageFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const payload: PlantRequest = {
			name,
			imageUrl: preview,
			purchaseDate,
			espece,
		};

		if (userId) {
			await createPlant(userId, payload);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{/* Nom */}
			<div>
				<Label>Plant Name</Label>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>

			{/* Date */}
			<div>
				<Label>Purchase Date</Label>
				<Input
					type="date"
					value={purchaseDate}
					onChange={(e) => setPurchaseDate(e.target.value)}
					required
				/>
			</div>

			{/* Espèce */}
			<div>
				<Label>Species</Label>
				<Select
					value={espece}
					onValueChange={(v) => setEspece(v as Espece)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select species" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(Espece).map((sp) => (
							<SelectItem key={sp} value={sp}>
								{sp}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Image */}
			<div>
				<Label>Image</Label>
				<Input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
				/>
				{preview && (
					<img
						src={preview}
						alt="Preview"
						className="mt-2 w-full h-40 object-cover rounded-md"
					/>
				)}
			</div>

			{/* Bouton */}
			<Button type="submit" className="w-full">
				{initialData ? 'Update Plant' : 'Create Plant'}
			</Button>
		</form>
	);
}
