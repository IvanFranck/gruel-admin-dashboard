'use client';

import { useState } from 'react';
import { SectionsTable } from './sections-table';
import { SectionDetail } from './section-detail';
import { Button } from '@/components/ui/button';
import { Section, SousSection } from '@/lib/types/menu';
import { Plus } from 'lucide-react';

// Example data for demonstration
const EXAMPLE_SECTIONS: Section[] = [
    {
        id: '1',
        nom: 'Au Magasin',
        visible: true,
        sousSections: [
            {
                id: '101',
                nom: 'Les Entrées',
                plats: [
                    {
                        id: '1001',
                        titre: 'Salade de chèvre',
                        prix: '9.50€',
                        description: 'Servie tiède, avec miel',
                        image: '/img/salade.jpg'
                    }
                ]
            },
            {
                id: '102',
                nom: 'Les Plats',
                plats: [
                    {
                        id: '1002',
                        titre: 'Bœuf Bourguignon',
                        prix: '16.50€',
                        description: 'Mijoté avec carottes et pommes de terre',
                        image: '/img/boeuf.jpg'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        nom: 'A Emporter',
        visible: false,
        sousSections: [
            {
                id: '201',
                nom: 'Formules',
                plats: [
                    {
                        id: '2001',
                        titre: 'Menu du jour',
                        prix: '12.90€',
                        description: 'Entrée + Plat + Dessert',
                    }
                ]
            }
        ]
    }
];

export function SectionsManagement() {
    const [sections, setSections] = useState<Section[]>(EXAMPLE_SECTIONS);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    // Handlers for section actions
    const handleAddSection = () => {
        // Implementation would open a modal to create a new section
        console.log('Add section');
    };

    const handleEditSection = (section: Section) => {
        // Implementation would open a modal to edit the section
        console.log('Edit section', section);
    };

    const handleDeleteSection = (sectionId: string) => {
        // Implementation would show a confirmation dialog before deleting
        setSections(sections.filter(s => s.id !== sectionId));
        if (selectedSection?.id === sectionId) {
            setSelectedSection(null);
        }
    };

    const handleToggleVisibility = (sectionId: string, visible: boolean) => {
        const updatedSections = sections.map(section =>
            section.id === sectionId ? { ...section, visible } : section
        );
        setSections(updatedSections);

        // Update the selected section if it's the one being toggled
        if (selectedSection?.id === sectionId) {
            setSelectedSection({ ...selectedSection, visible });
        }
    };

    const handleViewSection = (section: Section) => {
        setSelectedSection(section);
    };

    const handleSectionUpdate = (updatedSection: Section) => {
        const updatedSections = sections.map(section =>
            section.id === updatedSection.id ? updatedSection : section
        );
        setSections(updatedSections);
        setSelectedSection(updatedSection);
    };

    // Handlers for sous-section actions
    const handleAddSousSection = (sectionId: string) => {
        // Implementation would open a modal to create a new sous-section
        console.log('Add sous-section to section', sectionId);
    };

    const handleEditSousSection = (sousSection: SousSection) => {
        // Implementation would open a modal to edit the sous-section
        console.log('Edit sous-section', sousSection);
    };

    const handleDeleteSousSection = (sousSectionId: string) => {
        // Implementation would show a confirmation dialog before deleting
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Gestion des sections</h1>
                <Button onClick={handleAddSection}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une section
                </Button>
            </div>

            <SectionsTable
                sections={sections}
                onEdit={handleEditSection}
                onDelete={handleDeleteSection}
                onToggleVisibility={handleToggleVisibility}
                onView={handleViewSection}
            />

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