import { Home, LeafyGreenIcon } from 'lucide-react';

export interface RouteType {
	name: string;
	url: string;
	icon: React.ReactNode;
}
export const routes: RouteType[] = [
	{
		name: 'Dashboard',
		url: '/dashboard',
		icon: <Home className="w-5 h-5" />,
	},
	{
		name: 'Plant',
		url: '/dashboard/plant',
		icon: <LeafyGreenIcon className="w-5 h-5" />,
	},
];
