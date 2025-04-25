'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Section, SousSection } from '@/lib/types/menu';
import { GripVertical, Pencil, Plus, Trash2 } from 'lucide-react';

interface SectionDetailProps {
    section: Section;
    onSectionUpdate: (updatedSection: Section) => void;
    onAddSousSection: (sectionId: string) => void;
    onEditSousSection: (sousSection: SousSection) => void;
    onDeleteSousSection: (sousSectionId: string) => void;
}

// Sortable Sous-Section Item Component
function SortableSousSectionItem({
    sousSection,
    onEdit,
    onDelete
}: {
    sousSection: SousSection;
    onEdit: (sousSection: SousSection) => void;
    onDelete: (sousSectionId: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: sousSection.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between p-4 mb-2 bg-white rounded-md border shadow-sm"
        >
            <div className="flex items-center gap-2">
                <button
                    className="cursor-grab touch-none"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-5 w-5 text-gray-400" />
                </button>
                <div>
                    <div className="font-medium">{sousSection.nom}</div>
                    <div className="text-sm text-gray-500">
                        {sousSection.plats.length} plat(s)
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(sousSection)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => onDelete(sousSection.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export function SectionDetail({
    section,
    onSectionUpdate,
    onAddSousSection,
    onEditSousSection,
    onDeleteSousSection
}: SectionDetailProps) {
    const [sousSections, setSousSections] = useState<SousSection[]>(section.sousSections);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSousSections((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newSousSections = arrayMove(items, oldIndex, newIndex);

                // Update the parent section with the new sous-sections order
                const updatedSection = {
                    ...section,
                    sousSections: newSousSections
                };

                onSectionUpdate(updatedSection);

                return newSousSections;
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">{section.nom}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge variant={section.visible ? "default" : "secondary"} className={section.visible ? "bg-green-500" : ""}>
                            {section.visible ? "Visible" : "Masquée"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                            {sousSections.length} sous-section(s)
                        </span>
                    </div>
                </div>
                <Button onClick={() => onAddSousSection(section.id)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une sous-section
                </Button>
            </div>

            <div>
                <h3 className="text-lg font-medium mb-4">Sous-sections</h3>

                {sousSections.length === 0 ? (
                    <div className="p-8 text-center bg-gray-50 rounded-md border border-dashed">
                        <p className="text-gray-500">
                            Aucune sous-section. Cliquez sur le bouton "Ajouter une sous-section" pour commencer.
                        </p>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={sousSections.map((item) => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {sousSections.map((sousSection) => (
                                    <SortableSousSectionItem
                                        key={sousSection.id}
                                        sousSection={sousSection}
                                        onEdit={onEditSousSection}
                                        onDelete={onDeleteSousSection}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
} 