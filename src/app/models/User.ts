export interface Profile {
    phone_number: string | null;
    role: string | null;
  }
  
 
  
  
  
  export interface User {
    id: number | null;
    username: string | null;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    profile: Profile | null;
  }