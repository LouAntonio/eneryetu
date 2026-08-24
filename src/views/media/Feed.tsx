'use client';

import { Link } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { assetUrl } from '../../lib/assets';
import { api } from '../../services/api';
import type { Paginated, Post, PostType } from '../../types';
import { formatDate } from './format';
import {
	Byline,
	CategoryTag,
	CtaPill,
	EmptyBoard,
	LoadingBoard,
	Postmark,
	SunGlyph,
} from './shared';

function authorName(post: Post): string | null {
	if (!post.author || (!post.author.name && !post.author.surname)) return null;
	return `${post.author.name ?? ''} ${post.author.surname ?? ''}`.trim();
}

function typePathFor(post: Pick<Post, 'type'>): 'news' | 'blog' {
	return post.type === 'NOTICIA' ? 'news' : 'blog';
}

function CoverStory({ post }: { post: Post }) {
	const { t, i18n } = useTranslation();
	const locale = i18n.resolvedLanguage ?? 'en';
	const cover = assetUrl(post.coverImage);
	const path = typePathFor(post);
	const label = post.category?.name ?? t(`media.${path}.title`);
	const name = authorName(post);

	return (
		<article className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
			<div className="flex flex-col justify-center">
				<CategoryTag>{label}</CategoryTag>
				<h2 className="mt-5 font-editorial text-4xl font-semibold leading-[1.05] text-warm-ink sm:text-5xl">
					<Link
						to={`/media/${path}/${post.slug}`}
						className="transition-colors hover:text-amber"
					>
						{post.title}
					</Link>
				</h2>
				{post.excerpt ? (
					<p className="mt-5 max-w-xl font-editorial text-xl italic leading-relaxed text-sand">
						{post.excerpt}
					</p>
				) : null}
				<Byline
					className="mt-6"
					items={[
						name ? <span key="a">{t('media.byline', { name })}</span> : null,
						<time key="d" dateTime={post.createdAt}>
							{formatDate(post.createdAt, locale)}
						</time>,
					]}
				/>
				<div className="mt-7">
					<CtaPill to={`/media/${path}/${post.slug}`}>{t('common.readMore')} →</CtaPill>
				</div>
			</div>
			<div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-evergreen text-bone">
				{cover ? (
					<img
						src={cover}
						alt=""
						className="absolute inset-0 h-full w-full object-cover"
					/>
				) : (
					<div className="absolute inset-0 grid place-items-center">
						<SunGlyph className="h-48 w-48 opacity-90" />
					</div>
				)}
				<Postmark className="absolute right-5 top-5 [&_svg]:h-16 [&_svg]:w-16" />
				{!cover ? (
					<div className="absolute inset-x-0 bottom-0 p-6">
						<p className="font-editorial text-lg italic text-bone/80">{label}</p>
					</div>
				) : null}
			</div>
		</article>
	);
}

function StoryRow({ post }: { post: Post }) {
	const { t, i18n } = useTranslation();
	const locale = i18n.resolvedLanguage ?? 'en';
	const path = typePathFor(post);

	return (
		<li>
			<Link to={`/media/${path}/${post.slug}`} className="group flex flex-col gap-2 py-8">
				<div className="flex items-center gap-3">
					<time dateTime={post.createdAt} className="text-sm text-sand">
						{formatDate(post.createdAt, locale)}
					</time>
					<span aria-hidden className="h-px flex-1 bg-line-warm" />
					<span className="text-sm text-amber">
						{post.category?.name ?? t(`media.${path}.title`)}
					</span>
				</div>
				<h3 className="mt-2 font-editorial text-2xl font-semibold leading-[1.15] text-warm-ink transition-colors group-hover:text-amber sm:text-3xl">
					{post.title}
				</h3>
				{post.excerpt ? (
					<p className="mt-2 max-w-2xl leading-relaxed text-sand">{post.excerpt}</p>
				) : null}
				<span className="mt-3 inline-flex items-center gap-2 font-editorial text-lg font-semibold text-warm-ink">
					{t('common.readMore')}
					<span
						aria-hidden
						className="text-amber transition-transform duration-200 group-hover:translate-x-1"
					>
						→
					</span>
				</span>
			</Link>
		</li>
	);
}

interface FeedProps {
	type: PostType;
	sectionKey: 'blog' | 'news';
}

function Feed({ type, sectionKey }: FeedProps) {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery({
		queryKey: ['media', 'posts', type],
		queryFn: async () =>
			(await api.get<Paginated<Post>>('/posts', { params: { limit: 12, type } })).data,
	});

	if (isLoading) {
		return <LoadingBoard label={t('media.loading')} />;
	}

	if (!data || data.length === 0) {
		return (
			<EmptyBoard
				titleKey={sectionKey}
				cta={{ label: t('media.ctaContact'), to: '/contact' }}
			/>
		);
	}

	const featured = data.find((post) => post.featured) ?? data[0];
	const rest = data.filter((post) => post.id !== featured.id);

	return (
		<section className="min-h-[40vh] bg-bone">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<CoverStory post={featured} />
				{rest.length > 0 ? (
					<div className="mt-16 border-t border-line-warm pt-8">
						<span className="font-editorial text-xl font-semibold italic text-sand">
							{t('media.latest')}
						</span>
						<ul className="mt-2 divide-y divide-line-warm">
							{rest.map((post) => (
								<StoryRow key={post.id} post={post} />
							))}
						</ul>
					</div>
				) : null}
			</div>
		</section>
	);
}

export function MediaBlog() {
	return <Feed type="BLOG" sectionKey="blog" />;
}

export function MediaNews() {
	return <Feed type="NOTICIA" sectionKey="news" />;
}
