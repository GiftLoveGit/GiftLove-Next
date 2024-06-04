'use client'
interface ImageLoaderProps {
    src: string;
    width: number;
    quality?: number;
}
export default function ImageLoader({ src, width, quality }: ImageLoaderProps): string {
    return `${process.env.apiStorage}/${src}?w=${width}&q=${quality || 75}`
}