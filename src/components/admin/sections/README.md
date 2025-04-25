# Gestion des Sections - Documentation

Ce module permet de gérer les sections du menu de Gruel Traiteur, avec leur visibilité et l'ordre des sous-sections.

## Fonctionnalités

### Vue Tableau des Sections
- Affichage liste des sections avec leur nom et nombre de sous-sections
- Badge de statut (Visible/Masquée) pour chaque section
- Actions par section (Voir détails, Modifier, Changer visibilité, Supprimer)

### Vue Détaillée d'une Section
- Affichage des informations de la section (nom, visibilité)
- Liste des sous-sections avec fonctionnalité de drag-and-drop pour réorganisation
- Actions pour chaque sous-section (Modifier, Supprimer)
- Bouton pour ajouter une nouvelle sous-section

## Structure des Composants

```
src/components/admin/sections/
├── sections-table.tsx       # Tableau des sections avec actions
├── section-detail.tsx       # Vue détaillée d'une section avec drag-and-drop pour les sous-sections
└── sections-management.tsx  # Composant d'exemple intégrant les deux composants ci-dessus
```

## Usage

```tsx
import { SectionsManagement } from '@/components/admin/sections/sections-management';

export default function SectionPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionsManagement />
    </div>
  );
}
```

## Modèle de Données

Le système utilise le modèle suivant pour les sections, sous-sections et plats:

```typescript
// Section avec nouvelle propriété de visibilité
type Section = {
  id: string;
  nom: string;
  sousSections: SousSection[];
  visible: boolean;  // Nouvelle propriété
};

// Sous-section contenant des plats
type SousSection = {
  id: string;
  nom: string;
  plats: Plat[];
};

// Plat avec détails
type Plat = {
  id: string;
  titre: string;
  description: string;
  prix: string;
  image?: string;
};
```

## Fonctionnalités de Drag-and-Drop

La réorganisation des sous-sections est réalisée grâce à la bibliothèque `@dnd-kit`, qui permet:
- Le drag-and-drop par pointeur (souris, tactile)
- La navigation accessible au clavier
- Animation fluide lors des déplacements

## Notes d'implémentation

1. Le composant `SectionDetail` gère l'état local des sous-sections et le propage au parent via la fonction `onSectionUpdate`
2. La table des sections permet de visualiser rapidement toutes les sections et leur statut
3. Les badges de statut utilisent une couleur verte pour les sections visibles et un style secondaire pour les sections masquées
4. Tous les composants sont réactifs et adaptés aux appareils mobiles

## À venir

- Implémentation des formulaires de création/édition de sections et sous-sections
- Intégration avec l'API backend pour la persistance des données
- Système de filtre et de recherche pour les sections 