'use client';

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from '../lib/routing';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_KEYS = [
	'home',
	'about',
	'sectors',
	'services',
	'training',
	'media',
	'careers',
	'contact',
] as const;
const MEDIA_KEYS = ['blog', 'news', 'events', 'gallery'] as const;

type NavKey = (typeof NAV_KEYS)[number];
type MediaKey = (typeof MEDIA_KEYS)[number];

const ROUTES: Record<Exclude<NavKey, 'media'> | 'media', string> = {
	home: '/',
	about: '/about',
	sectors: '/sectors',
	services: '/services',
	training: '/training',
	media: '/media',
	careers: '/careers',
	contact: '/contact',
};

const CHARGE_BAR_HEIGHT = 72;

export function Header() {
	const { t } = useTranslation();
	const location = useLocation();
	const [prevPath, setPrevPath] = useState(location.pathname);
	const [open, setOpen] = useState(false);
	const [overHero, setOverHero] = useState(
		() => location.pathname === '/' && window.scrollY < 10,
	);
	const [charge, setCharge] = useState(0);

	useEffect(() => {
		const update = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			if (max <= 0) {
				setCharge(0);
				return;
			}
			setCharge(Math.min(1, Math.max(0, window.scrollY / max)));
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	useEffect(() => {
		const hero = document.getElementById('hero');
		if (location.pathname !== '/' || !hero) return;
		const observer = new IntersectionObserver(
			(entries) => setOverHero(entries[0]?.isIntersecting ?? false),
			{ rootMargin: `-${CHARGE_BAR_HEIGHT}px 0px 0px 0px`, threshold: 0 },
		);
		observer.observe(hero);
		return () => observer.disconnect();
	}, [location.pathname]);

	if (prevPath !== location.pathname) {
		setPrevPath(location.pathname);
		setOpen(false);
		setOverHero(location.pathname === '/' && window.scrollY < 10);
	}

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	const labels = {
		home: t('navigation.home'),
		about: t('navigation.about'),
		sectors: t('navigation.sectors'),
		services: t('navigation.services'),
		training: t('navigation.training'),
		media: t('navigation.media'),
		careers: t('navigation.careers'),
		contact: t('navigation.contact'),
	};
	const mediaLabels: Record<MediaKey, string> = {
		blog: t('navigation.blog'),
		news: t('navigation.news'),
		events: t('navigation.events'),
		gallery: t('navigation.gallery'),
	};

	const linkTone = (isActive: boolean) =>
		overHero
			? `border-b-2 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors ${
					isActive
						? 'border-volt text-volt'
						: 'border-transparent text-paper/70 hover:text-paper'
				}`
			: `border-b-2 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors ${
					isActive
						? 'border-volt text-ink'
						: 'border-transparent text-slate hover:text-ink'
				}`;

	return (
		<header
			className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
				overHero ? 'bg-transparent' : 'border-b border-line bg-white/95 backdrop-blur'
			}`}
		>
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-3">
				<Link to="/" className="flex items-center" aria-label={t('brand')}>
					<img src="/logo.png" alt={t('brand')} className="h-14 w-14 object-contain" />
				</Link>

				<nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
					{NAV_KEYS.map((key) =>
						key === 'media' ? (
							<div key={key} className="group relative">
								<NavLink
									to={ROUTES.media}
									aria-haspopup="true"
									className={({ isActive }) => linkTone(isActive)}
								>
									<span className="flex items-center gap-1.5">
										{labels.media}
										<svg
											width="8"
											height="5"
											viewBox="0 0 8 5"
											aria-hidden
											className="fill-current transition-transform duration-200 group-hover:rotate-180"
										>
											<path d="M0 0h8L4 5z" />
										</svg>
									</span>
								</NavLink>
								<div
									className={`invisible absolute left-0 top-full z-20 w-52 py-2 opacity-0 shadow-sm transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
										overHero
											? 'bg-ink-deep text-paper'
											: 'border border-line bg-white'
									}`}
								>
									{MEDIA_KEYS.map((child) => (
										<NavLink
											key={child}
											to={`${ROUTES.media}/${child}`}
											className={({ isActive }) =>
												`flex items-center gap-2 px-4 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors ${
													isActive
														? 'text-volt'
														: overHero
															? 'text-paper/70 hover:text-paper'
															: 'text-slate hover:text-ink'
												}`
											}
										>
											{mediaLabels[child]}
										</NavLink>
									))}
								</div>
							</div>
						) : (
							<NavLink
								key={key}
								to={ROUTES[key]}
								className={({ isActive }) => linkTone(isActive)}
							>
								{labels[key]}
							</NavLink>
						),
					)}
				</nav>

				<div className="hidden lg:block">
					<LanguageSwitcher dark={overHero} />
				</div>

				<button
					type="button"
					className={`flex h-10 w-10 items-center justify-center border transition-colors lg:hidden ${
						overHero ? 'border-paper/30 text-paper' : 'border-line bg-white text-ink'
					}`}
					onClick={() => setOpen((value) => !value)}
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label={open ? t('common.menuClose') : t('common.menuOpen')}
				>
					{open ? (
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							aria-hidden
							className="text-current"
						>
							<path
								d="M2 2l12 12M14 2L2 14"
								stroke="currentColor"
								strokeWidth="2"
								fill="none"
							/>
						</svg>
					) : (
						<svg
							width="18"
							height="12"
							viewBox="0 0 18 12"
							aria-hidden
							className="text-current"
						>
							<rect width="18" height="2" rx="1" fill="currentColor" />
							<rect y="5" width="18" height="2" rx="1" fill="currentColor" />
							<rect y="10" width="18" height="2" rx="1" fill="currentColor" />
						</svg>
					)}
				</button>
			</div>

			<div aria-hidden className="relative h-0.5 w-full bg-line/40">
				<div
					className="absolute inset-y-0 left-0 bg-volt transition-[width] duration-150 ease-out"
					style={{ width: `${charge * 100}%` }}
				/>
			</div>

			{open ? (
				<div id="mobile-menu" className="fixed inset-0 z-50 lg:hidden">
					<div
						className="absolute inset-0 bg-ink/60"
						onClick={() => setOpen(false)}
						aria-hidden
					/>
					<div className="absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col bg-ink-deep text-paper">
						<div className="flex items-center justify-between border-b border-paper/15 px-6 py-5">
							<img
								src="/logo.png"
								alt={t('brand')}
								className="h-12 w-12 object-contain"
							/>
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-volt"
							>
								{t('common.menuClose')}
							</button>
						</div>
						<nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
							<ul className="space-y-6">
								{NAV_KEYS.map((key) =>
									key === 'media' ? (
										<li key={key}>
											<Link
												to={ROUTES.media}
												className="flex items-center gap-3 font-display text-3xl font-bold uppercase text-paper transition-colors hover:text-volt"
											>
												{labels.media}
												<span
													aria-hidden
													className="font-mono text-sm text-paper/40"
												>
													▾
												</span>
											</Link>
											<ul className="mt-3 space-y-2 border-l border-paper/20 pl-5">
												{MEDIA_KEYS.map((child) => (
													<li key={child}>
														<Link
															to={`${ROUTES.media}/${child}`}
															className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-volt"
														>
															{mediaLabels[child]}
														</Link>
													</li>
												))}
											</ul>
										</li>
									) : (
										<li key={key}>
											<Link
												to={ROUTES[key]}
												className="font-display text-3xl font-bold uppercase text-paper transition-colors hover:text-volt"
											>
												{labels[key]}
											</Link>
										</li>
									),
								)}
							</ul>
						</nav>
						<div className="border-t border-paper/15 px-6 py-5">
							<LanguageSwitcher dark />
						</div>
					</div>
				</div>
			) : null}
		</header>
	);
}
