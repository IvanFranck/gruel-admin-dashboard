import { useState } from 'react';
import { SectionsTable } from "@/components/admin/sections/sections-table";
import { Section, SousSection } from '@/lib/types/menu';
import { SectionDetail } from "@/components/admin/sections/section-detail";

export function Sections() {
    // Exemple de données pour les sections
    const [sections, setSections] = useState<Section[]>([
        {
            id: '1',
            nom: 'Au Magasin',
            visible: true,
            sousSections: [],
        },
        {
            id: '2',
            nom: 'A Emporter',
            visible: false,
            sousSections: [],
        },
    ]);

    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    // Fonctions de gestion
    const handleEdit = (section: Section) => {
        console.log('Edit section', section);
        // Implémentez la logique pour modifier la section
    };

    const handleDelete = (sectionId: string) => {
        setSections(sections.filter(section => section.id !== sectionId));
        console.log('Deleted section with id:', sectionId);
    };

    const handleToggleVisibility = (sectionId: string, visible: boolean) => {
        const updatedSections = sections.map(section =>
            section.id === sectionId ? { ...section, visible } : section
        );
        setSections(updatedSections);
    };

    const handleView = (section: Section) => {
        setSelectedSection(section);
    };

    const handleSectionUpdate = (updatedSection: Section) => {
        const updatedSections = sections.map(section =>
            section.id === updatedSection.id ? updatedSection : section
        );
        setSections(updatedSections);
        setSelectedSection(updatedSection);
    };

    const handleAddSousSection = (sectionId: string) => {
        console.log('Add sous-section to section', sectionId);
        // Implémentez la logique pour ajouter une sous-section
    };

    const handleEditSousSection = (sousSection: SousSection) => {
        console.log('Edit sous-section', sousSection);
        // Implémentez la logique pour modifier la sous-section
    };

    const handleDeleteSousSection = (sousSectionId: string) => {
        if (selectedSection) {
            const updatedSousSections = selectedSection.sousSections.filter(
                ss => ss.id !== sousSectionId
            );

            const updatedSection = {
                ...selectedSection,
                sousSections: updatedSousSections
            };

            handleSectionUpdate(updatedSection);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Structure du Menu</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SectionsTable
                    sections={sections}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleVisibility={handleToggleVisibility}
                    onView={handleView}
                />
            </div>

            {selectedSection && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                    <SectionDetail
                        section={selectedSection}
                        onSectionUpdate={handleSectionUpdate}
                        onAddSousSection={handleAddSousSection}
                        onEditSousSection={handleEditSousSection}
                        onDeleteSousSection={handleDeleteSousSection}
                    />
                </div>
            )}
        </div>
    );
}