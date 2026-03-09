import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
};

// Pure utility — no side effects, easy to test
const getSpansFromRatio = (width, height) => {
    const ratio = width / height;
    if (ratio > 1.4) return { row: 1, col: 2 };       // Landscape
    if (ratio < 0.7) return { row: 2, col: 1 };       // Portrait
    if (ratio > 0.9 && ratio < 1.1 && width > 800)    // Large square
        return { row: 2, col: 2 };
    return { row: 1, col: 1 };
};

export const BentoGrid = ({ items }) => (
    <div className="pt-4 pb-4 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-4 grid-flow-dense max-w-7xl mx-auto">
            {items.map((item) => (
                <BentoItem
                    key={item.id ?? item.thumbnail}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    highres={item.highres}
                />
            ))}
        </div>
    </div>
);

const BentoItem = ({ title, thumbnail, highres }) => {
    const [spans, setSpans] = useState({ row: 1, col: 1 });
    const [thumbnailSrc, setThumbnailSrc] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);
    const hasTriggered = useRef(false); // prevent re-loading on re-intersection

    // ✅ Load image only when scrolled into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTriggered.current) {
                    hasTriggered.current = true;
                    import(thumbnail)
                        .then((mod) => setThumbnailSrc(mod.default))
                        .catch((err) => console.error('Failed to load thumbnail:', err));
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px', // start loading slightly before entering viewport
                threshold: 0
            }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [thumbnail]); // ✅ correct dependency

    const onImageLoad = useCallback((e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setSpans(getSpansFromRatio(naturalWidth, naturalHeight));
        setIsLoaded(true);
    }, []);

    const handleDownload = useCallback(async () => {
        try {
            const mod = await import(highres);
            const response = await fetch(mod.default);
            const blob = await response.blob();

            // ✅ Derive extension from the actual resolved path
            const ext = mod.default.split('.').pop().split('?')[0] || 'jpg';
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
    }, [highres, title]);

    return (
        <motion.div
            ref={containerRef}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'} // ✅ driven by load state, not scroll
            variants={cardVariants}
            layout
            className="relative group overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl"
            style={{
                borderRadius: '12px',
                gridRow: `span ${spans.row}`,
                gridColumn: `span ${spans.col}`
            }}
        >
            {/* Skeleton shown while image loads */}
            {!isLoaded && (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
            )}

            {thumbnailSrc && (
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
                    <h3 className="text-white font-medium text-sm pr-4 drop-shadow-md">
                        {title}
                    </h3>
                    <Button className="px-4! py-1! text-xs!" onClick={handleDownload}>
                        Download
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};