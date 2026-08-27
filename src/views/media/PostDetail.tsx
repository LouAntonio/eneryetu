'use client';

import { useMemo } from 'react';
import { Link, useParams } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { assetUrl } from '../../lib/assets';
import { api } from '../../services/api';
import type { Paginated, Post } from '../../types';
import { formatDate } from './format';
import {
	BackLink,
	Byline,
	CategoryTag,
	EmptyBoard,
	LoadingBoard,
	Postmark,
	SpecRow,
	SunGlyph,
} from './shared';

function estimateReadTime(content: string): number {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function MediaPostDetail() {
	const { t, i18n } = useTranslation();
	const { slug } = useParams<{ slug: string }>();
	const locale = i18n.resolvedLanguage ?? 'en';

	const { data: post, isLoading } = useQuery({
		queryKey: ['media', 'post', slug],
		enabled: Boolean(slug),
		queryFn: async () => (await api.get<{ data: Post }>(`/posts/slug/${slug}`)).data,
	});

	const type = post?.type;
	const path = post?.type === 'NOTICIA' ? 'news' : 'blog';

	const { data: latest } = useQuery({
		queryKey: ['media', 'latest', type],
		enabled: Boolean(type),
		queryFn: async () =>
			(await api.get<Paginated<Post>>('/posts', { params: { limit: 4, type } })).data,
	});

	const minutes = useMemo(() => (post ? estimateReadTime(post.content) : 0), [post]);

	if (isLoading) {
		return <LoadingBoard label={t('media.loading')} />;
	}

	if (!post) {
		return <EmptyBoard titleKey="blog" />;
	}

	const cover = assetUrl(post.coverImage);
	const name =
		post.author && (post.author.name || post.author.surname)
			? `${post.author.name ?? ''} ${post.author.surname ?? ''}`.trim()
			: null;
	const label = post.category?.name ?? t(`media.${path}.title`);
	const readTime = `${minutes} ${t('media.readingTime')}`;
	const related = (latest ?? []).filter((item) => item.id !== post.id).slice(0, 3);

	return (
		<article className="min-h-[40vh] bg-bone">
			<div className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20">
				<BackLink to={`/media/${path}`} label={t(`media.${path}.title`)} />

				<header className="mt-8 max-w-3xl">
					<CategoryTag>{label}</CategoryTag>
					<h1 className="mt-5 font-editorial text-4xl font-semibold leading-[1.05] text-warm-ink sm:text-5xl lg:text-6xl">
						{post.title}
					</h1>
					<Byline
						className="mt-6"
						items={[
							name ? <span key="a">{t('media.byline', { name })}</span> : null,
							<time key="d" dateTime={post.createdAt}>
								{formatDate(post.createdAt, locale)}
							</time>,
							<span key="r">{readTime}</span>,
						]}
					/>
				</header>

				<div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
					<div className="min-w-0">
						<div className="relative mb-10 min-h-[280px] overflow-hidden rounded-2xl bg-evergreen text-bone">
							{cover ? (
								<img
									src={cover}
									alt=""
									className="absolute inset-0 h-full w-full object-cover"
									// eslint-disable-next-line @next/next/no-img-element
								/>
							) : (
								<div className="absolute inset-0 grid place-items-center">
									<SunGlyph className="h-44 w-44 opacity-90" />
								</div>
							)}
							<Postmark className="absolute right-5 top-5 [&_svg]:h-14 [&_svg]:w-14" />
						</div>
						<div
							className="rich-content"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					</div>

					<aside className="hidden lg:block">
						<div className="rounded-2xl border border-line-warm bg-card p-6 lg:sticky lg:top-24">
							<span className="font-editorial text-lg font-semibold text-warm-ink">
								{t('media.specTitle')}
							</span>
							<dl className="mt-3 divide-y divide-line-warm border-t border-line-warm">
								<SpecRow
									label={t('media.spec.category')}
									value={post.category?.name ?? label}
								/>
								<SpecRow
									label={t('media.spec.date')}
									value={formatDate(post.createdAt, locale)}
								/>
								<SpecRow
									label={t('media.spec.author')}
									value={name ?? 'ENERYETU'}
								/>
								<SpecRow label={t('media.spec.reading')} value={readTime} />
							</dl>
						</div>

						{related.length > 0 ? (
							<div className="mt-8">
								<span className="font-editorial text-lg font-semibold italic text-sand">
									{t('media.latest')}
								</span>
								<ul className="mt-2 divide-y divide-line-warm border-t border-line-warm">
									{related.map((item) => (
										<li key={item.id}>
											<Link
												to={`/media/${path}/${item.slug}`}
												className="group block py-3"
											>
												<span className="text-xs text-sand">
													{formatDate(item.createdAt, locale)}
												</span>
												<span className="mt-1 block font-editorial text-lg font-semibold leading-snug text-warm-ink transition-colors group-hover:text-amber">
													{item.title}
												</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						) : null}
					</aside>
				</div>
			</div>
		</article>
	);
}
