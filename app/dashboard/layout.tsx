import { SiteHeader } from '@/components/layaout/appHeader';
import AppSiderBar from '@/components/layaout/appSider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
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
						<main className="w-full h-full ">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
								{children}
							</div>
						</main>
					</SidebarInset>
				</SidebarProvider>
			</body>
		</html>
	);
}
