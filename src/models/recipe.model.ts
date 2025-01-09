export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  category: string;
  tags?: string;
  imageUrl: string;
  cookingTime?: number;
  prepTime?: number;
  yield: number;
  steps?: string;
  rating: number;
}

export const TAGS = [{ name: 'Dinner', key: 'Dinner' },
{ name: 'Healthy', key: 'Healthy' }, { name: 'Salty', key: 'Salty' }, { name: 'Sweet', key: 'Sweet' },
{ name: 'Italian', key: 'Italian' },
{ name: 'Lunch', key: 'Lunch' },
{ name: 'Breakfast', key: 'Breakfast' },

];

export interface Tag {
  name?: string;
  key?: string;

}