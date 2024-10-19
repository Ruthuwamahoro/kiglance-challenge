export interface Photo {
    photo: string
}
export interface User {
    id: string;
    email: string;
    firstName: string;
    isVerified: boolean;
    lastName: string;
    profile: Photo[]
}
export interface ProductTagsInterface {
    products: Array<{ name: string; [key: string]: any}>;
    success: boolean;
    loading: boolean;
    error: string | null;
}