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

export interface UserIntroFormProps {
    onBack: () => void;
    onSkip: () => void;
    onSubmit: (data: UserIntroData) => void;
  }
  
export interface UserIntroData {
headline: string;
jobTitle: string;
location: string;
}