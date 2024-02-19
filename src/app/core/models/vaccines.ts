export interface Vaccine {
  id: string;
  name: string;
  veterinary: string;
  doctor: string;
  pet: number;
  created_at: string;
  updated_at: string;
}

export interface ReqVaccine {
  name: string;
  veterinary: number;
  doctor: string;
  pet: number;
}
