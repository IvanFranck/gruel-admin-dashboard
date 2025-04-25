import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SousSection } from '@/lib/types/menu';
import { useMenuStore } from '@/lib/store/menuStore';
import { SousSectionItem } from './SousSectionItem';

interface SousSectionListProps {
    sectionId: string;
    sousSections: SousSection[];
}

export function SousSectionList({ sectionId, sousSections }: SousSectionListProps) {
    const reorderSousSections = useMenuStore((state) => state.reorderSousSections);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = sousSections.findIndex((ss) => ss.id === active.id);
        const newIndex = sousSections.findIndex((ss) => ss.id === over.id);

        reorderSousSections(sectionId, oldIndex, newIndex);
    };

    if (sousSections.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Aucune sous-section. Utilisez le bouton "+" pour en ajouter.
            </div>
        );
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={sousSections.map((ss) => ss.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2 pl-8">
                    {sousSections.map((sousSection) => (
                        <SousSectionItem
                            key={sousSection.id}
                            sectionId={sectionId}
                            sousSection={sousSection}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
} 