import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useMenuStore } from '@/lib/store/menuStore';
import { Section } from '@/lib/types/menu';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SectionItem } from '@/components/menu/SectionItem';
import { AddSectionDialog } from '@/components/menu/AddSectionDialog';

export default function MenuPage() {
    const { sections, reorderSections } = useMenuStore();
    const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);

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

            <div className="bg-white rounded-lg shadow p-6">
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

            <AddSectionDialog
                open={isAddSectionOpen}
                onOpenChange={setIsAddSectionOpen}
            />
        </div>
    );
} 