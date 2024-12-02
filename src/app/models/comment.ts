


export interface Owner {
  id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  
}export interface create_comment {
  annonce_id: number;
  user_id: string;
  contenu: string;
  
}
export interface Commentaire {
  annonce_id: number;
  user: Owner;
  contenu: string;
  date_creation : string ; 
  
}