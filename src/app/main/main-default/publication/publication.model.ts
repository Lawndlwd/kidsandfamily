import {UserObject} from '../../../profile/my-info/my-info.component';

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
    user: UserObject;
}
export interface Need {
  id: number;
    need: string;
}
export interface Action {
  id: number;
    actions: string;
}
export interface Theme  {
    theme: string;
}
export interface SousType  {
  id: number;
  sousType: string;
}
export interface Profile  {
    id: number;
    type: Type ;
    sousType: SousType ;
    User: string;
    adressComplete?: string;
    city: string;
    codePostal: number;
    country: string;
    nameVoie: string;
    numProfile: number;
    numVoie: number;
    state: string;
}
export interface Type  {
    id: number;
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
