'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface AnimatedCounterProps {
	value: number;
	duration?: number;
	delay?: number;
	className?: string;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	separator?: string;
}

export function AnimatedCounter({
	value,
	duration = 1500,
	delay = 0,
	className = '',
	prefix = '',
	suffix = '',
	decimals = 0,
	separator = ',',
}: AnimatedCounterProps) {
	const [displayValue, setDisplayValue] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const frameRef = useRef<number | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, delay);
		return () => clearTimeout(timer);
	}, [delay]);

	useEffect(() => {
		if (!isVisible) return;

		let startTime: number;
		const startValue = 0;

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime;
			const progress = Math.min((currentTime - startTime) / duration, 1);
			const easedProgress = 1 - Math.pow(1 - progress, 3);
			const currentValue = startValue + (value - startValue) * easedProgress;
			setDisplayValue(currentValue);

			if (progress < 1) {
				frameRef.current = requestAnimationFrame(animate);
			}
		};

		frameRef.current = requestAnimationFrame(animate);
		return () => {
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
		};
	}, [isVisible, value, duration]);

	const formattedValue = displayValue.toLocaleString(undefined, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});

	return (
		<ScrollReveal animation="fade" delay={delay}>
			<span className={`font-display font-black tabular-nums ${className}`}>
				{prefix}
				{formattedValue}
				{suffix}
			</span>
		</ScrollReveal>
	);
}

interface StatItemProps {
	label: string;
	value: number;
	unit?: string;
	prefix?: string;
	suffix?: string;
	delay?: number;
	className?: string;
	dark?: boolean;
}

export function StatItem({
	label,
	value,
	unit,
	prefix = '',
	suffix = '',
	delay = 0,
	className = '',
	dark = false,
}: StatItemProps) {
	return (
		<div className={`text-center ${className}`}>
			<div className="flex items-end justify-center gap-1 mb-1">
				<AnimatedCounter
					value={value}
					prefix={prefix}
					suffix={suffix}
					delay={delay}
					className={`text-5xl lg:text-6xl font-black ${dark ? 'text-volt' : 'text-ink'}`}
				/>
				{unit && <span className="ui-label text-volt self-start pb-1 ml-1">{unit}</span>}
			</div>
			<p className={`ui-label ${dark ? 'text-paper/80' : 'text-slate'}`}>{label}</p>
		</div>
	);
}
