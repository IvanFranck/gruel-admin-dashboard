import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SousSection } from '@/lib/types/menu';
import { useMenuStore } from '@/lib/store/menuStore';
import { Button } from '@/components/ui/button';
import { GripVertical, Settings, Trash } from 'lucide-react';
import { EditSousSectionDialog } from './EditSousSectionDialog';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface SousSectionItemProps {
    sectionId: string;
    sousSection: SousSection;
}

export function SousSectionItem({ sectionId, sousSection }: SousSectionItemProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const deleteSousSection = useMenuStore((state) => state.deleteSousSection);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: sousSection.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
    };

    const handleDelete = () => {
        deleteSousSection(sectionId, sousSection.id);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white rounded border p-3 flex items-center gap-2 ${isDragging ? 'opacity-50' : ''
                }`}
        >
            <button
                {...attributes}
                {...listeners}
                className="touch-none"
            >
                <GripVertical className="w-5 h-5 text-gray-400" />
            </button>

            <div className="flex-1">
                <div className="font-medium">{sousSection.nom}</div>
                <div className="text-sm text-gray-500">
                    {sousSection.plats.length} plats
                </div>
            </div>

            <div className="flex items-center gap-2">
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
                            <AlertDialogTitle>Supprimer la sous-section</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer la sous-section "{sousSection.nom}" ?
                                Cette action supprimera également tous les plats associés.
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

            <EditSousSectionDialog
                sectionId={sectionId}
                sousSection={sousSection}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
            />
        </div>
    );
} 