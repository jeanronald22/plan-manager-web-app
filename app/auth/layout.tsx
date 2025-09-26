import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Auth | Plant app',
	description: 'Page de connexion et inscription',
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary/10`}
			>
				<div className="flex h-screen">
					{/* Section formulaire */}
					<div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
						<div className="w-full max-w-md">{children}</div>
					</div>

					{/* Section image avec card au centre */}
					<div className="relative hidden md:flex flex-1">
						<Image
							src="/cover-image.jpg"
							alt="Cover Image"
							priority
							width={600}
							height={600}
							className="w-full h-full object-cover "
						/>

						{/* Card centrée avec effet glass */}
						<div className="absolute inset-0 flex items-center justify-center ">
							<div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-lg  shadow-xl">
								<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
									Bring Your Plants to Life
								</h2>
								<p className="leading-7 [&:not(:first-child)]:mt-6">
									Track watering schedules, get reminders, and
									grow a greener home with ease.
								</p>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
