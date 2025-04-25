# Gestion du Menu - Gruel Traiteur

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage Status](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Description
Cette fonctionnalité permet à l'administrateur de gérer dynamiquement le menu du site de vente de plats traiteurs. L'interface est conçue pour être claire, simple et mobile-first, sans CMS.

## Table des Matières
- [Aperçu du Projet](#aperçu-du-projet)
- [Fonctionnalités Clés](#fonctionnalités-clés)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Développement](#développement)
- [Structure du Projet](#structure-du-projet)

## Aperçu du Projet
Le système de gestion du menu permet à l'administrateur de :
- Créer, éditer et supprimer des sections et sous-sections.
- Gérer les plats associés à chaque sous-section.
- Réorganiser les éléments du menu via un système de drag-and-drop.
- Avoir un retour visuel clair lors des modifications.

## Fonctionnalités Clés
- **Gestion des Sections** : Ajouter, modifier et supprimer des sections.
- **Gestion des Sous-sections** : Ajouter, modifier et supprimer des sous-sections.
- **Drag-and-Drop** : Réorganiser les sections et sous-sections facilement.
- **Formulaires Validés** : Utilisation de Zod pour la validation des formulaires.
- **Interface Réactive** : Design responsive pour une utilisation sur mobile et tablette.

## Technologies Utilisées
- **Frontend** : React 19, TypeScript
- **State Management** : Zustand
- **Styling** : Tailwind CSS, Shadcn UI
- **Formulaires** : react-hook-form, Zod
- **Drag & Drop** : @dnd-kit/core

## Installation
Pour installer les dépendances nécessaires, exécutez la commande suivante :

```bash
pnpm install
```

## Utilisation
Pour démarrer le projet, utilisez la commande suivante :

```bash
pnpm dev
```

Accédez à l'interface de gestion du menu via votre navigateur à l'adresse `http://localhost:3000/menu`.

## Développement
Pour contribuer au projet, suivez ces étapes :
1. Clonez le dépôt.
2. Créez une nouvelle branche pour votre fonctionnalité.
3. Effectuez vos modifications et testez-les.
4. Soumettez une demande de tirage (pull request).

## Structure du Projet

src/
├── components/
│ ├── menu/
│ │ ├── AddSectionDialog.tsx
│ │ ├── EditSectionDialog.tsx
│ │ ├── AddSousSectionDialog.tsx
│ │ ├── EditSousSectionDialog.tsx
│ │ ├── SectionItem.tsx
│ │ ├── SousSectionItem.tsx
│ │ ├── SousSectionList.tsx
│ │ └── README.md
│ └── ui/
│ ├── button.tsx
│ └── dialog.tsx
└── lib/
├── store/
│ └── menuStore.ts
└── types/
└── menu.ts


## Maintenance
- Assurez-vous de mettre à jour les dépendances régulièrement.
- Testez toutes les nouvelles fonctionnalités avant de les déployer.

## Notes
- Ne jamais commettre d'informations sensibles (clés API, identifiants).
- Maintenez la synchronisation entre le code et la documentation.
