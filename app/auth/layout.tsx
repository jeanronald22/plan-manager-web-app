'use client';
import Image from 'next/image';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
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
					fill
					className="object-cover"
				/>

				{/* Card centrée avec effet glass */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-lg shadow-xl">
						<h2 className="text-3xl font-semibold tracking-tight">
							Bring Your Plants to Life
						</h2>
						<p className="mt-4 leading-7">
							Track watering schedules, get reminders, and grow a
							greener home with ease.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
