"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { getStallBySlug } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Instagram, MapPin, Tag, ZoomIn } from "lucide-react";
import ImageViewer from "@/components/ui/image-viewer";

type PageProps = {
    params: Promise<{ category: string; stall: string }>;
};

export default function StallPage({ params }: PageProps) {
    const { category, stall: stallSlug } = use(params);
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const stallData = getStallBySlug(stallSlug);

    if (!stallData) {
        return notFound();
    }

    const openViewer = (index: number) => {
        setCurrentImageIndex(index);
        setViewerOpen(true);
    };

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            {/* Image Viewer Overlay */}
            <ImageViewer
                isOpen={viewerOpen}
                onClose={() => setViewerOpen(false)}
                images={stallData.images}
                initialIndex={currentImageIndex}
            />

            {/* Hero Banner */}
            <div className="relative h-[50vh] w-full bg-neutral-900">
                <Image
                    src={stallData.bannerImage}
                    alt={stallData.name}
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Navigation - Adjusted top spacing for fixed header */}
                <div className="absolute top-24 left-8 md:left-12 z-20">
                    <Link
                        href={`/${category}`}
                        className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to {category}
                    </Link>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-2"
                    >
                        {stallData.name}
                    </motion.h1>
                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-lg">
                        <span className="bg-orange-600 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
                            {stallData.category}
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Stall No. {stallData.id}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Description & Gallery */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Description */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                            About Us
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed whitespace-pre-line">
                            {stallData.description}
                        </p>
                    </section>

                    {/* Gallery */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stallData.images.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    onClick={() => openViewer(idx)}
                                    className={`relative group rounded-2xl overflow-hidden h-64 shadow-lg hover:shadow-xl transition-shadow cursor-zoom-in ${idx === 0 && stallData.images.length > 2 ? 'md:col-span-2 md:h-80' : ''}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Gallery image ${idx + 1}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Hover Overlay with Icon */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                                            <ZoomIn className="w-6 h-6" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Key Details & Pricing */}
                <div className="space-y-8">

                    {/* Owner Details Card */}
                    <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 shadow-xl">
                        <h3 className="text-xl font-bold mb-6 border-b pb-2">Stall Owner</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-lg font-medium">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                    <span className="text-xl font-bold">{stallData.ownerName.charAt(0)}</span>
                                </div>
                                {stallData.ownerName}
                            </div>

                            <a href={`tel:${stallData.ownerPhone}`} className="flex items-center gap-3 text-neutral-600 hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50">
                                <Phone className="w-5 h-5" />
                                {stallData.ownerPhone}
                            </a>

                            {stallData.instagram && (
                                <a
                                    href={`https://instagram.com/${stallData.instagram.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-neutral-600 hover:text-pink-600 transition-colors p-2 rounded-lg hover:bg-pink-50"
                                >
                                    <Instagram className="w-5 h-5" />
                                    {stallData.instagram}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Pricing List */}
                    {stallData.items && stallData.items.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 border-b pb-2 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-green-600" />
                                Menu / Price List
                            </h3>
                            <ul className="space-y-3">
                                {stallData.items.map((item, idx) => (
                                    <li key={idx} className="flex justify-between items-center text-neutral-700 py-2 border-b border-dashed border-neutral-200 last:border-0 hover:bg-neutral-50 rounded px-2 transition-colors">
                                        <span>{item.name}</span>
                                        <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

