import { User } from "./User";


export interface Annonce {
  id: number | null;
  owner: User | null; // Allowing owner to be nullable
  titre: string | null;
  localisation: string | null;
  category: 'vente' | 'location' | null; // Can be null if not assigned
  price: string | null; // Can be null if price is missing or undefined
  date: string | null; // Can be null if the date is missing
  description: string | null;
  nombre_de_chambres: number | null; // Number of rooms can be nullable
  surface: string | null; // Surface area can be nullable
  image: string | null; // Image field can also be nullable
  equiped: boolean; // Equip status can be nullable
  lease_duration: number | null; // Lease duration can be null
  is_negotiable: string ;// Negotiability can be nullable
  is_occupied: string;
}

