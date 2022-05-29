import { ContactInfo } from "./ContactInfo";

export interface User {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
    national_id: string;
    avatar: File;
    fullInfo: number;
    created_at: Date;
    updated_at: Date;
    password: string;
    confirmPassword: string;
    ContactInfo: ContactInfo;
}
