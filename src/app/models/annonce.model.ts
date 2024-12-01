export interface Annonce {
  id: number;
  titre: string;
  localisation: string;
  category: string;
  price: number;
  date: string;
  description: string;
  nombre_de_chambres: number;
  surface: number;  // Change from string to number
  image: string;
  equiped: boolean;  // Change from string to boolean
  lease_duration: number | null;
  is_negotiable: boolean;
  is_occupied: string;
  owner: number;
}
