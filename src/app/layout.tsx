import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
	title: 'ENERYETU',
	description:
		'ENERYETU is an Oil & Gas and Mining sector services company, 100% Angolan, created by Angolan professionals with over 15 years of experience in Project Management in the Oil & Gas sector.',
	icons: { icon: '/icon.png' },
};

export const viewport: Viewport = {
	themeColor: '#0B1B2A',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500..900&family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
