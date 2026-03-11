import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

// ✅ Glob at build time — Vite statically analyzes these and bundles all matched files
const thumbnailMap = import.meta.glob(
    '../../assets/images/art/thumbnails/*.webp',
    { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const highresJpgMap = import.meta.glob(
    '../../assets/images/art/highres/*.jpg',
    { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const highresPngMap = import.meta.glob(
    '../../assets/images/art/highres/*.png',
    { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

// Resolve a filename to its bundled URL
const resolveThumbnail = (name: string): string | undefined =>
    thumbnailMap[`../../assets/images/art/thumbnails/${name}.webp`];

const resolveHighres = (name: string): string | undefined =>
    highresJpgMap[`../../assets/images/art/highres/${name}.jpg`] ??
    highresPngMap[`../../assets/images/art/highres/${name}.png`];

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
};

const getSpansFromRatio = (width: number, height: number) => {
    const ratio = width / height;
    if (ratio > 1.4) return { row: 1, col: 2 };
    if (ratio < 0.7) return { row: 2, col: 1 };
    if (ratio > 0.9 && ratio < 1.1 && width > 800) return { row: 2, col: 2 };
    return { row: 1, col: 1 };
};

export const BentoGrid = ({ items }: { items: { name: string; title: string }[] }) => (
    <div className="pt-4 pb-4 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-4 grid-flow-dense max-w-7xl mx-auto">
            {items.map((item) => (
                <BentoItem
                    key={item.name}
                    title={item.title}
                    // ✅ Resolve to real bundled URLs here, not in artImages data
                    thumbnailSrc={resolveThumbnail(item.name)}
                    highresSrc={resolveHighres(item.name)}
                />
            ))}
        </div>
    </div>
);

const BentoItem = ({
    title,
    thumbnailSrc,
    highresSrc,
}: {
    title: string;
    thumbnailSrc?: string;
    highresSrc?: string;
}) => {
    const [spans, setSpans] = useState({ row: 1, col: 1 });
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasTriggered = useRef(false);

    // ✅ Lazy-reveal: only render <img> once scrolled into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTriggered.current) {
                    hasTriggered.current = true;
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px', threshold: 0 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        setSpans(getSpansFromRatio(naturalWidth, naturalHeight));
        setIsLoaded(true);
    }, []);

    const handleDownload = useCallback(async () => {
        if (!highresSrc) {
            console.error('Highres image not found for', title);
            return;
        }
        try {
            const response = await fetch(highresSrc);
            const blob = await response.blob();
            const ext = highresSrc.split('.').pop()?.split('?')[0] ?? 'jpg';
            const url = URL.createObjectURL(blob);
            const link = Object.assign(document.createElement('a'), {
                href: url,
                download: `${title}.${ext}`
            });
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading image:', err);
        }
    }, [highresSrc, title]);

    return (
        <motion.div
            ref={containerRef}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            variants={cardVariants}
            layout
            className="relative group overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl"
            style={{
                borderRadius: '12px',
                gridRow: `span ${spans.row}`,
                gridColumn: `span ${spans.col}`
            }}
        >
            {!isLoaded && <div className="w-full h-full bg-gray-200 animate-pulse" />}

            {/* ✅ thumbnailSrc is already a resolved URL — no dynamic import needed */}
            {isVisible && thumbnailSrc && (
                <img
                    src={thumbnailSrc}
                    alt={title}
                    onLoad={onImageLoad}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-medium text-sm pr-4 drop-shadow-md">{title}</h3>
                    <Button className="px-4! py-1! text-xs!" onClick={handleDownload}>
                        Download
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};