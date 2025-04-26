import { Plat } from './menu';

export type PlatWithParents = Plat & {
  sectionId: string;
  sectionNom: string;
  sousSectionId: string;
  sousSectionNom: string;
};

export type PlatFormProps = {
  initialPlat?: Partial<Plat>;
  sectionId?: string;
  sousSectionId?: string;
  onSubmit: (plat: Plat, sectionId: string, sousSectionId: string) => void;
  onCancel: () => void;
};

export type PlatsTableProps = {
  plats: PlatWithParents[];
  onEdit: (plat: PlatWithParents) => void;
  onDelete: (sectionId: string, sousSectionId: string, platId: string) => void;
  onView: (plat: PlatWithParents) => void;
};

export type PlatDetailProps = {
  plat?: PlatWithParents;
  onClose: () => void;
  onEdit: (plat: PlatWithParents) => void;
};

export type PlatFilterValue = {
  sectionId?: string;
  sousSectionId?: string;
}; 