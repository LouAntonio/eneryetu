'use client';

import LinkNext from 'next/link';
import { usePathname as useNextPathname, useRouter, useParams as useNextParams } from 'next/navigation';
import { useEffect, type AnchorHTMLAttributes, type ReactNode } from 'react';

const REDIRECT_KEY = 'eneryetu-login-redirect';

type ClassNameArg =
	| string
	| ((args: { isActive: boolean; isPending: boolean }) => string)
	| undefined;

function resolveClassName(className: ClassNameArg, isActive: boolean) {
	if (typeof className === 'function') return className({ isActive, isPending: false });
	return className;
}

function is_active(pathname: string, to: string, end?: boolean) {
	if (end) return pathname === to;
	return pathname === to || pathname.startsWith(`${to}/`);
}

export function Link({
	to,
	children,
	...rest
}: { to: string; children?: ReactNode } & Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	'href'
>) {
	return (
		<LinkNext href={to} {...rest}>
			{children}
		</LinkNext>
	);
}

export function NavLink({
	to,
	end,
	className,
	children,
	...rest
}: {
	to: string;
	end?: boolean;
	className?: ClassNameArg;
	children?: ReactNode | ((args: { isActive: boolean; isPending: boolean }) => ReactNode);
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>) {
	const pathname = useNextPathname();
	const active = is_active(pathname, to, end);
	return (
		<LinkNext href={to} className={resolveClassName(className, active)} {...rest}>
			{typeof children === 'function' ? children({ isActive: active, isPending: false }) : children}
		</LinkNext>
	);
}

export function useLocation() {
	const pathname = useNextPathname();
	let state = null;
	try {
		const raw = sessionStorage.getItem(REDIRECT_KEY);
		state = raw ? JSON.parse(raw) : null;
	} catch {
		state = null;
	}
	return { pathname, search: '', hash: '', key: pathname, state };
}

export function useParams<T extends Record<string, string | undefined>>() {
	return useNextParams() as T;
}

export function useNavigate() {
	const router = useRouter();
	return (
		to: string,
		options?: { replace?: boolean },
	) => {
		sessionStorage.removeItem(REDIRECT_KEY);
		if (options?.replace) router.replace(to);
		else router.push(to);
	};
}

export function Navigate({
	to,
	replace,
	state,
}: {
	to: string;
	replace?: boolean;
	state?: unknown;
}) {
	const router = useRouter();
	useEffect(() => {
		try {
			if (state !== undefined) sessionStorage.setItem(REDIRECT_KEY, JSON.stringify(state));
			else sessionStorage.removeItem(REDIRECT_KEY);
		} catch {
			/* storage unavailable */
		}
		if (replace) router.replace(to);
		else router.push(to);
	}, [router, to, replace, state]);
	return null;
}
