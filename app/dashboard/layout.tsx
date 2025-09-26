'use client';
import { SiteHeader } from '@/components/layaout/appHeader';
import AppSiderBar from '@/components/layaout/appSider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<SidebarProvider
				style={
					{
						'--sidebar-width': 'calc(var(--spacing) * 72)',
						'--header-height': 'calc(var(--spacing) * 12)',
					} as React.CSSProperties
				}
			>
				<AppSiderBar />
				<SidebarInset>
					<SiteHeader />
					<main className="flex-1 w-full h-full ">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
							{children}
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
