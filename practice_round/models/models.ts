export interface Ingredient {
  name: string;
}

export interface Client {
  likedIngredients: Ingredient[];
  dislikedIngredients: Ingredient[];
}

export interface Pizza {
  ingredients: Ingredient[];
}

export interface Dataset {
  name: string;
  totalClients: number;
  clients: Client[];
}
