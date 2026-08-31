'use client';

import { useEffect, useRef, useState, type ReactNode, type ReactElement } from 'react';

interface ScrollRevealProps {
	children: ReactNode;
	className?: string;
	threshold?: number;
	rootMargin?: string;
	triggerOnce?: boolean;
	delay?: number;
	animation?: 'up' | 'fade' | 'none';
}

export function ScrollReveal({
	children,
	className = '',
	threshold = 0.1,
	rootMargin = '0px 0px -50px 0px',
	triggerOnce = true,
	delay = 0,
	animation = 'up',
}: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (triggerOnce && ref.current) {
						observer.unobserve(ref.current);
					}
				} else if (!triggerOnce) {
					setIsVisible(false);
				}
			},
			{ threshold, rootMargin },
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [threshold, rootMargin, triggerOnce]);

	const animationClass =
		animation === 'up' ? 'reveal-up' : animation === 'fade' ? 'reveal-fade' : '';
	const delayClass = delay ? `delay-${Math.min(Math.ceil(delay / 80), 6)}` : '';

	return (
		<div
			ref={ref}
			className={`${animationClass} ${delayClass} ${className}`.trim()}
			style={{ opacity: isVisible ? 1 : 0 }}
		>
			{children}
		</div>
	);
}

interface StaggeredRevealProps {
	children: ReactNode;
	className?: string;
	stagger?: number;
	threshold?: number;
	rootMargin?: string;
	animation?: 'up' | 'fade';
}

function isReactElement(node: ReactNode): node is ReactElement {
	return typeof node === 'object' && node !== null && '$$typeof' in node;
}

export function StaggeredReveal({
	children,
	className = '',
	stagger = 80,
	threshold = 0.1,
	rootMargin = '0px 0px -50px 0px',
	animation = 'up',
}: StaggeredRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (ref.current) observer.unobserve(ref.current);
				}
			},
			{ threshold, rootMargin },
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [threshold, rootMargin]);

	const animationClass = animation === 'up' ? 'reveal-up' : 'reveal-fade';

	const childArray = Array.isArray(children) ? children : [children];

	return (
		<div ref={ref} className={className}>
			{childArray.map((child, index) => {
				if (!isReactElement(child)) return child;
				const childProps = child.props as Record<string, unknown>;
				return {
					...child,
					props: {
						...childProps,
						className:
							`${animationClass} delay-${Math.min(index + 1, 6)} ${(childProps.className as string) || ''}`.trim(),
						style: {
							opacity: isVisible ? 1 : 0,
							...(childProps.style as React.CSSProperties),
						},
					},
				} as ReactElement;
			})}
		</div>
	);
}
