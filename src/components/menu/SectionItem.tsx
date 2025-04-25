import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Section } from '@/lib/types/menu';
import { useMenuStore } from '@/lib/store/menuStore';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, GripVertical, Plus, Settings, Trash } from 'lucide-react';
import { SousSectionList } from './SousSectionList';
import { EditSectionDialog } from './EditSectionDialog';
import { AddSousSectionDialog } from './AddSousSectionDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface SectionItemProps {
    section: Section;
}

export function SectionItem({ section }: SectionItemProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddSousSectionOpen, setIsAddSousSectionOpen] = useState(false);
    const deleteSection = useMenuStore((state) => state.deleteSection);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: section.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
    };

    const handleDelete = () => {
        deleteSection(section.id);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-gray-50 rounded-lg border ${isDragging ? 'opacity-50' : ''}`}
        >
            <div className="p-4 flex items-center gap-2">
                <button
                    {...attributes}
                    {...listeners}
                    className="touch-none"
                >
                    <GripVertical className="w-5 h-5 text-gray-400" />
                </button>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 flex-1"
                >
                    {isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                    ) : (
                        <ChevronRight className="w-5 h-5" />
                    )}
                    <span className="font-medium">{section.nom}</span>
                    <span className="text-sm text-gray-500">
                        ({section.sousSections.length} sous-sections)
                    </span>
                </button>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAddSousSectionOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Sous-section
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditOpen(true)}
                    >
                        <Settings className="w-4 h-4" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer la section</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Êtes-vous sûr de vouloir supprimer la section "{section.nom}" ?
                                    Cette action supprimera également toutes les sous-sections associées.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Supprimer
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {isExpanded && (
                <div className="px-4 pb-4">
                    <SousSectionList
                        sectionId={section.id}
                        sousSections={section.sousSections}
                    />
                </div>
            )}

            <EditSectionDialog
                section={section}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
            />

            <AddSousSectionDialog
                sectionId={section.id}
                open={isAddSousSectionOpen}
                onOpenChange={setIsAddSousSectionOpen}
            />
        </div>
    );
} 