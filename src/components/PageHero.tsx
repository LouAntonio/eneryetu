'use client';

interface PageHeroProps {
	id?: string;
	eyebrow: string;
	title: string;
	body?: string;
	image: string;
}

export function PageHero({ id, eyebrow, title, body, image }: PageHeroProps) {
	return (
		<section id={id} className="relative isolate min-h-screen overflow-hidden border-b border-line text-paper">
			<img
				src={image}
				alt=""
				aria-hidden
				className="absolute inset-0 -z-20 h-full w-full object-cover"
				loading="eager"
			/>
			<div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />
			<div aria-hidden className="absolute inset-0 -z-10 grid-dark opacity-70" />

			<div className="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-16 sm:pt-32 lg:pt-36">
				<span className="ui-label text-paper/70">{eyebrow}</span>
				<h1 className="mt-5 max-w-4xl font-display text-6xl font-black uppercase leading-[0.92] tracking-tight text-paper sm:text-7xl lg:text-8xl">
					{title}
				</h1>
				{body ? (
					<p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">{body}</p>
				) : null}
			</div>

			<div aria-hidden className="absolute bottom-0 inset-x-0 z-10 h-1 w-full bg-volt" />
		</section>
	);
}