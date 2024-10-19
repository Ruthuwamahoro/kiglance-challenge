export interface Product {
    id: string
    name: string
}

export interface ProductInterface{
    products: Product[];
    loading: boolean;
    error: string;
    success: boolean;
}
export interface ProductTagsInterface {
    products: Array<{ name: string; [key: string]: any }>;
    success: boolean;
    loading: boolean;
    error: string | null;
}