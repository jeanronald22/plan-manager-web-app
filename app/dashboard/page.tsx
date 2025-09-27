'use client';

import { useEffect, useMemo } from 'react';
import { usePlantStore } from '@/store/PlantStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from 'recharts';

const COLORS = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#A020F0',
	'#FF4567',
];

export default function DashboardPage() {
	const { plants, fetchPlantsByUser, loading, error } = usePlantStore();
	const userId = useAuthStore((state) => state.userId);

	useEffect(() => {
		if (!userId) return;
		fetchPlantsByUser(userId);
	}, [userId, fetchPlantsByUser]);

	const wateringFrequencyData = useMemo(() => {
		return plants.map((p) => ({
			name: p.name,
			lastWatering:
				p.wateringHistories.length > 0
					? p.wateringHistories[p.wateringHistories.length - 1]
							.wateringDate
					: null,
			needs:
				p.wateringNeeds.length > 0
					? p.wateringNeeds[0].frequencyInDays
					: 0,
		}));
	}, [plants]);

	const speciesDistribution = useMemo(() => {
		const countMap: Record<string, number> = {};
		plants.forEach((p) => {
			countMap[p.espece] = (countMap[p.espece] || 0) + 1;
		});
		return Object.entries(countMap).map(([name, value]) => ({
			name,
			value,
		}));
	}, [plants]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="space-y-6 p-8">
			<h1 className="text-4xl font-bold">Dashboard</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Bar chart: watering frequency */}
				<Card>
					<CardHeader>
						<CardTitle>Watering Frequency</CardTitle>
					</CardHeader>
					<CardContent className="h-80">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={wateringFrequencyData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar
									dataKey="needs"
									fill="#82ca9d"
									name="Frequency (days)"
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Pie chart: species distribution */}
				<Card>
					<CardHeader>
						<CardTitle>Species Distribution</CardTitle>
					</CardHeader>
					<CardContent className="h-80 flex justify-center items-center">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={speciesDistribution}
									dataKey="value"
									nameKey="name"
									outerRadius={100}
									fill="#8884d8"
									label
								>
									{speciesDistribution.map((_, index) => (
										<Cell
											key={index}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
