'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../ui/sidebar';
import React from 'react';
import NavMain from './navMain';
import Image from 'next/image';
import { routes } from '@/types/route';

export default function AppSiderBar({
	...props
}: {
	props: React.ComponentProps<typeof Sidebar>;
}) {
	return (
		<Sidebar collapsible="icon" {...props} variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]"
						>
							<a href="#" className="flex items-center gap-2 ">
								<Image
									src="/logo 2.png"
									width={50}
									height={50}
									alt="eneo logo"
									className=" object-cover"
								/>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={routes} />
			</SidebarContent>
			{/* <SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter> */}
		</Sidebar>
	);
}
