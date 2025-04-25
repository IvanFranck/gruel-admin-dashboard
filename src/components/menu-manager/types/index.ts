export interface Dish {
  id: string;
  title: string;
  price: string;
}

export interface Subsection {
  id: string;
  title: string;
  dishes: Dish[];
}

export interface Section {
  id: string;
  title: string;
  subsections: Subsection[];
}

export interface StaticPage {
  id: string;
  title: string;
  type: 'static';
}

export interface ExpandedSections {
  [key: string]: boolean;
}

export interface SelectedItem {
  id?: string;
  title?: string;
  type?: 'section' | 'subsection';
  sectionId?: string;
  message?: string;
}

export interface MenuManagerProps {
  initialSections: Section[];
  initialPages: StaticPage[];
} 