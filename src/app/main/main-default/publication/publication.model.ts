export interface Publication {
    id: number;
    title: string;
    description: string;
    descriptionBenefits?: string;
    startedAt?: Date;
    endAt?: Date;
    needs: Need  ;  
    action: Action ;
    profile?: Profile ;
    publicCible: PublicCible ;
    userPubComment?:UserPubComment ;
    theme:Theme ;
    shortDescription?:string;
    createdAtAgo:string;
    user: User; 
}
export interface Need {
    need: string;
}
export interface Action {
    actions: string;
}
export interface Theme  {
    theme: string;
}
export interface SousType  {
    name: string;
}
export interface Profile  {
    type: Type ;
    sous_type: SousType ;
    adressComplete: string;
    city: string;
    codePostal: string;
    country: string;
    id: number;
    nameVoie: string;
    numVoie: string;
    state: string;
    }
export interface Type  {
    type: string;
}
export interface UserPubComment  {
    user?: User ;
    comment?: Comment ;
}
export interface User  {
    name: string;
    firstName?: string;
}
export interface Comment  {
    comment: string;
}
export interface PublicCible  {
    name: string;
}
