export type ProductListItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  stock: number;
  category: string | null;
  imageUrl: string | null;
};

export type ProductDetail = ProductListItem & {
  description: string;
  images: { id: string; url: string; alt: string | null }[];
  seller: { name: string };
};
