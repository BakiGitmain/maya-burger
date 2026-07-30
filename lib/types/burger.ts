export type Burger = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  category: string;
  isAvailable: boolean;
  isFeatured: boolean;
};

export type BurgerFormMode =
  | "create"
  | "edit";