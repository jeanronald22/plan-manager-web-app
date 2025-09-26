import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';

export default function Plant() {
	return (
		<div className="space-y-4">
			<h1 className="scroll-m-20  text-4xl font-extrabold tracking-tight text-balance">
				Manage your interio Planter
			</h1>
			<div className="flex max-w-lg items-center gap-2 pt-4">
				<Input placeholder="search planter..." />
				<Button>
					<PlusCircle />
					new planter
				</Button>
			</div>
		</div>
	);
}
