'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useMenuStore } from '@/lib/store/menuStore';
import { Section } from '@/lib/types/menu';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SectionItem } from '@/components/menu/SectionItem';
import { AddSectionDialog } from '@/components/menu/AddSectionDialog';
import { MenuPreview } from '@/components/menu/MenuPreview';
import { v4 as uuidv4 } from 'uuid';

// Données d'exemple pour initialiser le store
const exampleData: Section[] = [
    {
        id: uuidv4(),
        nom: 'Au Magasin',
        visible: true,
        sousSections: [
            {
                id: uuidv4(),
                nom: 'Les Entrées',
                plats: [
                    {
                        id: uuidv4(),
                        titre: 'Salade de chèvre',
                        description: 'Servie tiède, avec miel',
                        prix: '9.50€',
                        image: '/img/salade.jpg'
                    }
                ]
            },
            {
                id: uuidv4(),
                nom: 'Les Plats',
                plats: [
                    {
                        id: uuidv4(),
                        titre: 'Bœuf Bourguignon',
                        description: 'Mijoté avec carottes et champignons',
                        prix: '14.50€'
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        nom: 'St Valentin',
        visible: true,
        sousSections: [
            {
                id: uuidv4(),
                nom: 'Menu Duo',
                plats: [
                    {
                        id: uuidv4(),
                        titre: 'Plateau pour deux',
                        description: 'Assortiment de spécialités',
                        prix: '39.90€'
                    }
                ]
            }
        ]
    }
];

export function Menu() {
    const { sections, setSections, reorderSections } = useMenuStore();
    const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);

    // Initialiser avec des données d'exemple si le store est vide
    useEffect(() => {
        if (sections.length === 0) {
            setSections(exampleData);
        }
    }, [sections.length, setSections]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = sections.findIndex((section) => section.id === active.id);
        const newIndex = sections.findIndex((section) => section.id === over.id);

        reorderSections(oldIndex, newIndex);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Structure du Menu</h1>
                <Button onClick={() => setIsAddSectionOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une Section
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Panneau de gestion */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Configuration</h2>
                    <p className="text-gray-600 mb-6">
                        Glissez-déposez les éléments pour réorganiser le menu. Cliquez sur le titre d'une section pour l'ouvrir ou la fermer.
                    </p>

                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={sections.map((section) => section.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-4">
                                {sections.map((section: Section) => (
                                    <SectionItem
                                        key={section.id}
                                        section={section}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

                {/* Panneau de prévisualisation */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Aperçu du menu</h2>
                    <p className="text-gray-600 mb-6">
                        Voici un aperçu en temps réel de votre menu tel qu'il apparaîtra sur le site.
                    </p>

                    <MenuPreview />
                </div>
            </div>

            <AddSectionDialog
                open={isAddSectionOpen}
                onOpenChange={setIsAddSectionOpen}
            />
        </div>
    );
} 