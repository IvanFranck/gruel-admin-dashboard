'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatSchema, PlatFormValues } from '@/lib/schemas/plat.schema';
import { PlatFormProps } from '@/lib/types/platUI';
import { Plat } from '@/lib/types/menu';
import { useSectionsStore } from '@/lib/store/sectionStore';
import { ImageSelector } from './image-selector';

export function PlatForm({ initialPlat, sectionId, sousSectionId, onSubmit, onCancel }: PlatFormProps) {
    const { sections } = useSectionsStore();

    const form = useForm<PlatFormValues>({
        resolver: zodResolver(PlatSchema),
        defaultValues: {
            titre: initialPlat?.titre || '',
            description: initialPlat?.description || '',
            prix: initialPlat?.prix || '',
            image: initialPlat?.image || '',
            sectionId: sectionId || '',
            sousSectionId: sousSectionId || '',
        },
    });

    const watchSectionId = form.watch('sectionId');

    const sousSections = watchSectionId
        ? sections.find(s => s.id === watchSectionId)?.sousSections || []
        : [];

    // Reset sous-section when section changes
    useEffect(() => {
        if (watchSectionId) {
            form.setValue('sousSectionId', '');
        }
    }, [watchSectionId, form]);

    const handleFormSubmit = (values: PlatFormValues) => {
        const platData: Plat = {
            id: initialPlat?.id || uuidv4(),
            titre: values.titre,
            description: values.description,
            prix: values.prix,
            image: values.image,
        };

        onSubmit(platData, values.sectionId, values.sousSectionId);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{initialPlat?.id ? 'Modifier le plat' : 'Ajouter un plat'}</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="titre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Salade de chèvre" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Servie tiède, avec miel..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prix"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prix</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="9.50€" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sectionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Section</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner une section" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sections.map((section) => (
                                                <SelectItem key={section.id} value={section.id}>
                                                    {section.nom}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sousSectionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sous-section</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                        disabled={!watchSectionId}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner une sous-section" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sousSections.map((sousSection) => (
                                                <SelectItem key={sousSection.id} value={sousSection.id}>
                                                    {sousSection.nom}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <ImageSelector
                                            currentImage={field.value}
                                            onImageSelect={(imageUrl) => field.onChange(imageUrl)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" onClick={onCancel}>
                            Annuler
                        </Button>
                        <Button type="submit">
                            {initialPlat?.id ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
} 