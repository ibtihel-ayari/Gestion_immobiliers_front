export interface Profile {
  phone_number: string | null;
  role: string | null;
}

export interface Owner {
  id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  profile: Profile | null;
}



export interface Owner {
  id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  profile: Profile | null;
}

export interface Annonce {
  id: number | null;
  owner: Owner | null; // Allowing owner to be nullable
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

