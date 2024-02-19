export interface Pet {
  age: number;
  category: string;
  created_at: string;
  id: number;
  name: string;
  sexo: string;
  type: string;
  updated_at: string;
  user: number;
  weight: number;
}


export interface PetBody {
  name: string;
  category: string;
  age: number;
  weight: number;
  sex: string;
  user: number;
  type: string;
}
