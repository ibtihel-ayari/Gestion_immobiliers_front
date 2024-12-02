export interface AnnonceCreation {
  owner: number; // Assuming the 'owner' is a user ID (or another type of reference)
  titre: string;
  localisation: string;
  category: string;
  price: number;
  description: string;
  nombre_de_chambres: number;
  surface: number;
  image: string;
  date: string;
  is_occupied: boolean;
}
