import { Button } from '@/components/ui/button';
import { SectionsTable } from "@/components/admin/sections/sections-table";
import { PlusIcon } from 'lucide-react';
import { useSectionsStore } from '@/lib/store/sectionStore';
import { Section } from '@/lib/types/menu';
import { useNavigate } from 'react-router-dom';

export function SectionsList() {
    const {
        sections,
        setSelectedSectionId,
        deleteSection,
        toggleSectionVisibility
    } = useSectionsStore();

    const navigate = useNavigate();

    const handleEdit = (section: Section) => {
        setSelectedSectionId(section.id);
        navigate(`/sections/${section.id}`);
    };

    const handleView = (section: Section) => {
        setSelectedSectionId(section.id);
        navigate(`/sections/${section.id}`);
    };

    const handleAddSection = () => {
        // Implémentation pour ajouter une section
        console.log('Add section');
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Structure du Menu</h1>
                <Button onClick={handleAddSection}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Ajouter une section
                </Button>
            </div>

            <SectionsTable
                sections={sections}
                onEdit={handleEdit}
                onDelete={deleteSection}
                onToggleVisibility={toggleSectionVisibility}
                onView={handleView}
            />
        </div>
    );
}