export type Plat = {
  id: string;
  titre: string;
  description: string;
  prix: string;
  image?: string;
};

export type SousSection = {
  id: string;
  nom: string;
  plats: Plat[];
};

export type Section = {
  id: string;
  nom: string;
  sousSections: SousSection[];
  visible: boolean;
};

export type DragItem = {
  id: string;
  type: 'section' | 'sousSection' | 'plat';
  parentId?: string;
}; 