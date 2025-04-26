'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Section } from '@/lib/types/menu';
import { EyeIcon, EyeOffIcon, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

interface SectionsTableProps {
    sections: Section[];
    onEdit: (section: Section) => void;
    onDelete: (sectionId: string) => void;
    onToggleVisibility: (sectionId: string, visible: boolean) => void;
    onView: (section: Section) => void;
}

export function SectionsTable({
    sections,
    onEdit,
    onDelete,
    onToggleVisibility,
    onView,
}: SectionsTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Sous-sections</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sections.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                Aucune section trouvée.
                            </TableCell>
                        </TableRow>
                    ) : (
                        sections.map((section) => (
                            <TableRow key={section.id}>
                                <TableCell className="font-medium">{section.nom}</TableCell>
                                <TableCell>{section.sousSections.length}</TableCell>
                                <TableCell>
                                    {section.visible ? (
                                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                            Visible
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="bg-gray-500 hover:bg-gray-600 text-white">Masquée</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Ouvrir menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => onView(section)}>
                                                Détails
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit(section)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Modifier
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => onToggleVisibility(section.id, !section.visible)}
                                            >
                                                {section.visible ? (
                                                    <>
                                                        <EyeOffIcon className="mr-2 h-4 w-4" />
                                                        Masquer
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeIcon className="mr-2 h-4 w-4" />
                                                        Afficher
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => onDelete(section.id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
} 