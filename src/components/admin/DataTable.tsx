'use client';

interface DataTableProps<T> {
	columns: { key: string; label: string; render?: (row: T) => React.ReactNode }[];
	rows: T[];
	rowKey: (row: T) => string;
	empty?: string;
	loading?: boolean;
	indexed?: boolean;
}

export function DataTable<T>({
	columns,
	rows,
	rowKey,
	empty,
	loading,
	indexed = true,
}: DataTableProps<T>) {
	if (loading) {
		return (
			<div className="flex items-center gap-3 border border-line bg-white px-5 py-6">
				<span aria-hidden className="node-live h-2 w-2 rounded-full bg-blue" />
				<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
					A carregar…
				</span>
			</div>
		);
	}

	if (rows.length === 0) {
		return (
			<div className="border border-line bg-white px-5 py-10 text-center">
				<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
					{empty ?? 'Sem registos'}
				</span>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto border border-line bg-white">
			<table className="w-full border-collapse text-left">
				<thead>
					<tr className="border-b border-line">
						{indexed ? (
							<th className="w-12 px-4 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate">
								#
							</th>
						) : null}
						{columns.map((col) => (
							<th
								key={col.key}
								className="px-4 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate"
							>
								{col.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-line">
					{rows.map((row, index) => (
						<tr key={rowKey(row)} className="group transition-colors hover:bg-ink">
							{indexed ? (
								<td className="px-4 py-3 font-mono text-[0.65rem] tracking-[0.16em] text-blue group-hover:text-paper/60">
									{String(index + 1).padStart(2, '0')}
								</td>
							) : null}
							{columns.map((col) => (
								<td key={col.key} className="px-4 py-3 align-middle">
									{col.render ? (
										col.render(row)
									) : (
										<span className="font-mono text-sm text-ink group-hover:text-paper">
											{String(
												(row as Record<string, unknown>)[col.key] ?? '',
											)}
										</span>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
