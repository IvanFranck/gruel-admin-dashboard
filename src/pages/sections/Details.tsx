import { useEffect } from 'react';
import { SectionDetail as SectionDetailComponent } from "@/components/admin/sections/section-detail";
import { useSectionsStore } from '@/lib/store/sectionStore';
import { useParams, useNavigate } from 'react-router-dom';

export function SectionDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        getSelectedSection,
        setSelectedSectionId,
        updateSection,
        addSousSection,
        updateSousSection,
        deleteSousSection
    } = useSectionsStore();

    const selectedSection = getSelectedSection();

    useEffect(() => {
        if (id && typeof id === 'string') {
            setSelectedSectionId(id);
        }
    }, [id, setSelectedSectionId]);

    if (!selectedSection) {
        return (
            <div className="container mx-auto py-8">
                <div className="p-8 text-center">
                    <p>Section non trouvée</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => navigate('/sections')}
                    >
                        Retour à la liste
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={() => navigate('/sections')}
                >
                    &larr; Retour à la liste
                </button>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border">
                <SectionDetailComponent
                    section={selectedSection}
                    onSectionUpdate={updateSection}
                    onAddSousSection={(sectionId) => addSousSection(sectionId, { id: '', nom: '', plats: [] })}
                    onEditSousSection={(sousSection) => updateSousSection(selectedSection.id, sousSection)}
                    onDeleteSousSection={(sousSectionId) => deleteSousSection(selectedSection.id, sousSectionId)}
                />
            </div>
        </div>
    );
}