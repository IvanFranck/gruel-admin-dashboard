import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlatsTable } from '@/components/admin/plats/plats-table';
import { PlatForm } from '@/components/admin/plats/plat-form';
import { PlatDetail } from '@/components/admin/plats/plat-detail';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { usePlatStore } from '@/lib/store/platStore';
import { PlatWithParents } from '@/lib/types/platUI';
import { Plat } from '@/lib/types/menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export function PlatsList() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPlatData, setEditingPlatData] = useState<PlatWithParents | null>(null);
    const [viewingPlat, setViewingPlat] = useState<PlatWithParents | null>(null);

    const { getAllPlats, addPlat, updatePlat, deletePlat } = usePlatStore();

    const plats = getAllPlats();

    const handleAddPlat = () => {
        setEditingPlatData(null);
        setIsFormOpen(true);
    };

    const handleEditPlat = (plat: PlatWithParents) => {
        setViewingPlat(null);
        setEditingPlatData(plat);
        setIsFormOpen(true);
    };

    const handleViewPlat = (plat: PlatWithParents) => {
        setViewingPlat(plat);
    };

    const handleSubmitPlat = (platData: Plat, sectionId: string, sousSectionId: string) => {
        if (editingPlatData) {
            updatePlat(sectionId, sousSectionId, platData);
            toast.success(`Le plat ${platData.titre} a été mis à jour.`);
        } else {
            addPlat(sectionId, sousSectionId, platData);
            toast.success(`Le plat ${platData.titre} a été ajouté.`);
        }

        setIsFormOpen(false);
        setEditingPlatData(null);
    };

    const handleDeletePlat = (sectionId: string, sousSectionId: string, platId: string) => {
        deletePlat(sectionId, sousSectionId, platId);
        toast.success("Le plat a été supprimé avec succès.");
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Gestion des Plats</h1>
                <Button onClick={handleAddPlat}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Ajouter un plat
                </Button>
            </div>

            <PlatsTable
                plats={plats}
                onEdit={handleEditPlat}
                onDelete={handleDeletePlat}
                onView={handleViewPlat}
            />

            <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto" side="right">
                    <PlatForm
                        initialPlat={editingPlatData || undefined}
                        sectionId={editingPlatData?.sectionId}
                        sousSectionId={editingPlatData?.sousSectionId}
                        onSubmit={handleSubmitPlat}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </SheetContent>
            </Sheet>

            <PlatDetail
                plat={viewingPlat || undefined}
                onClose={() => setViewingPlat(null)}
                onEdit={handleEditPlat}
            />
        </div>
    );
} 