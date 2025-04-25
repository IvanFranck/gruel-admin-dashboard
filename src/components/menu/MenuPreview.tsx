'use client';

import { useState } from 'react';
import { useMenuStore } from '@/lib/store/menuStore';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function MenuPreview() {
    const { sections } = useMenuStore();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-md mx-auto">
            <div className="bg-slate-800 text-white py-3 px-4">
                <h3 className="font-medium">Menu Gruel Traiteur</h3>
            </div>

            <div className="divide-y">
                {/* Pages statiques */}
                <div className="py-2 px-4 hover:bg-slate-50">
                    <a href="#" className="block">Accueil</a>
                </div>
                <div className="py-2 px-4 hover:bg-slate-50">
                    <a href="#" className="block">Livraison</a>
                </div>
                <div className="py-2 px-4 hover:bg-slate-50">
                    <a href="#" className="block">Contact</a>
                </div>

                {/* Sections dynamiques */}
                {sections.map((section) => (
                    <div key={section.id} className="w-full">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="flex items-center justify-between w-full py-2 px-4 hover:bg-slate-50 text-left"
                        >
                            <span>{section.nom}</span>
                            {expandedSections[section.id] ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>

                        {expandedSections[section.id] && section.sousSections.length > 0 && (
                            <div className="bg-slate-50">
                                {section.sousSections.map((sousSection) => (
                                    <div
                                        key={sousSection.id}
                                        className="py-2 px-8 hover:bg-slate-100 border-t border-slate-100"
                                    >
                                        <a href="#" className="block">
                                            {sousSection.nom}
                                            <span className="text-slate-400 text-sm ml-2">
                                                ({sousSection.plats.length} plats)
                                            </span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 