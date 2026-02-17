export interface Material {
  id: string;
  name: string;
}

export interface Ingredient {
  materialId: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  level: number;
  craftTime: string;
  stylePoints: number;
  ingredients: Ingredient[];
}

export interface WorkshopData {
  materials: Material[];
  recipes: Recipe[];
}