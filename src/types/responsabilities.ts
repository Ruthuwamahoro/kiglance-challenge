export interface responsability {
    id: string
    name: string
}

export interface ResponsabilitiesInterface{
    responsabilities: responsability[];
    loading: boolean;
    error: string;
    success: boolean;
}
export interface Step3Props {
    selectedResponsibility: string;
    setSelectedResponsibility: (responsibility: string) => void;
}