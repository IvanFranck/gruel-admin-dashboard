'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, MoreVertical, Search, Trash2, Eye } from 'lucide-react';
import { PlatsTableProps, PlatWithParents, PlatFilterValue } from '@/lib/types/platUI';
import { useSectionsStore } from '@/lib/store/sectionStore';

export function PlatsTable({ plats, onEdit, onDelete, onView }: PlatsTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<PlatFilterValue>({});
    const [platToDelete, setPlatToDelete] = useState<PlatWithParents | null>(null);
    const { sections } = useSectionsStore();

    const filteredPlats = plats.filter((plat) => {
        const matchesSearch = plat.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plat.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSection = !filter.sectionId || plat.sectionId === filter.sectionId;
        const matchesSousSection = !filter.sousSectionId || plat.sousSectionId === filter.sousSectionId;

        return matchesSearch && matchesSection && matchesSousSection;
    });

    const sousSections = filter.sectionId
        ? sections.find(s => s.id === filter.sectionId)?.sousSections || []
        : [];

    const handleDeleteClick = (plat: PlatWithParents) => {
        setPlatToDelete(plat);
    };

    const confirmDelete = () => {
        if (platToDelete) {
            onDelete(platToDelete.sectionId, platToDelete.sousSectionId, platToDelete.id);
            setPlatToDelete(null);
        }
    };

    const cancelDelete = () => {
        setPlatToDelete(null);
    };

    return (
        <>
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher des plats..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select
                            value={filter.sectionId || ''}
                            onValueChange={(value) => setFilter({ sectionId: value || undefined, sousSectionId: undefined })}
                        >
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Toutes les sections" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Toutes les sections</SelectItem>
                                {sections.map((section) => (
                                    <SelectItem key={section.id} value={section.id}>
                                        {section.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {filter.sectionId && (
                            <Select
                                value={filter.sousSectionId || ''}
                                onValueChange={(value) => setFilter({ ...filter, sousSectionId: value || undefined })}
                            >
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <SelectValue placeholder="Toutes les sous-sections" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="O">Toutes les sous-sections</SelectItem>
                                    {sousSections.map((sousSection) => (
                                        <SelectItem key={sousSection.id} value={sousSection.id}>
                                            {sousSection.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Plat</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Section / Sous-section</TableHead>
                            <TableHead className="w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPlats.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    Aucun plat trouvé.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPlats.map((plat) => (
                                <TableRow key={plat.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-2">
                                            {plat.image && (
                                                <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                                                    <img
                                                        src={plat.image}
                                                        alt={plat.titre}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <div>{plat.titre}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1">
                                                    {plat.description}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{plat.prix}</TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {plat.sectionNom} / {plat.sousSectionNom}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => onView(plat)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Voir
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onEdit(plat)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteClick(plat)}>
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

            <AlertDialog open={!!platToDelete} onOpenChange={(isOpen) => !isOpen && cancelDelete()}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer le plat "{platToDelete?.titre}" ?
                            Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
} 