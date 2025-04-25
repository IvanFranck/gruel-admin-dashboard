import { Droppable } from 'react-beautiful-dnd';
import { Subsection } from '../types';
import { SubsectionItem } from './SubsectionItem';

interface SubsectionListProps {
    sectionId: string;
    subsections: Subsection[];
}

export function SubsectionList({ sectionId, subsections }: SubsectionListProps) {
    return (
        <Droppable
            droppableId={`${sectionId}-drop`}
            type="subsection"
        >
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-50 p-3 pl-8 space-y-2"
                >
                    {subsections.map((subsection, index) => (
                        <SubsectionItem
                            key={subsection.id}
                            subsection={subsection}
                            sectionId={sectionId}
                            index={index}
                        />
                    ))}
                    {provided.placeholder}
                    {subsections.length === 0 && (
                        <div className="p-4 text-center text-gray-500 italic text-sm">
                            Aucune sous-section dans cette catégorie.
                        </div>
                    )}
                </div>
            )}
        </Droppable>
    );
} 