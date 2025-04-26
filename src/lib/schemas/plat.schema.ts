import { z } from 'zod';

export const PlatSchema = z.object({
  titre: z.string().min(1, "Le titre du plat est requis"),
  description: z.string().min(1, "La description du plat est requise"),
  prix: z.string().min(1, "Le prix du plat est requis").regex(/^\d+(\.\d{1,2})?€?$/, "Format de prix invalide (ex: 12.50€)"),
  image: z.string().optional(),
  sectionId: z.string().min(1, "Veuillez sélectionner une section"),
  sousSectionId: z.string().min(1, "Veuillez sélectionner une sous-section"),
});

export type PlatFormValues = z.infer<typeof PlatSchema>; 