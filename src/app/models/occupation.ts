export interface OccupationCreation {
    owner: number; // ID of the owner
    client: number; // ID of the client
    annonce: number; // ID of the annonce
    occupation_type: string; // Type of occupation, e.g., "permanent"
    start_date: string | null; // Start date of the occupation (nullable)
    end_date: string | null; // End date of the occupation (nullable)
    is_active: string; // Whether the occupation is active
  }
 