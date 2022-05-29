import { User } from "./user";

export interface Report {
    reportID: number;
    userID: number;
    serialNumber: number;
    type: string;
    brand: string;
    model: string;
    color: string;
    RAM: number;
    ROM: number;
    frontCrach_top: boolean;
    frontCrach_bottom: boolean;
    frontCrach_center: boolean;
    backCrach_top: boolean;
    backCrach_bottom: boolean;
    backCrach_center: boolean;
    devicePicture: File; 
    additional_info: string;
    status: number;
    created_at: Date;
    updated_at: Date;
    user: User;
}

