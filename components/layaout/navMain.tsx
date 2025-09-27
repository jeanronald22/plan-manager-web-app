'use client';
import { RouteType } from '@/types/route';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMain({ items }: { items: RouteType[] }) {
	const path = usePathname();
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => {
						const isActive = path === item.url;

						return (
							<SidebarMenuItem key={item.name}>
								<SidebarMenuButton tooltip={item.name} asChild>
									<Link
										href={item.url}
										className={`flex items-center gap-2 rounded-lg px-3 py-2 transition w-full ${
											isActive
												? 'bg-primary text-primary-foreground'
												: ''
										}`}
									>
										{item.icon}
										<span>{item.name}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
