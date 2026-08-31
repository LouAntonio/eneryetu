export function SectionHead({
	eyebrow,
	title,
	lead,
}: {
	eyebrow: string;
	title: string;
	lead?: string;
}) {
	return (
		<div className="mb-10 sm:mb-14">
			<p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-glow">
				{eyebrow}
			</p>
			<h2 className="font-display-alt mt-3 text-4xl uppercase leading-[0.95] text-inklit sm:text-5xl lg:text-6xl">
				{title}
			</h2>
			{lead ? <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p> : null}
		</div>
	);
}
