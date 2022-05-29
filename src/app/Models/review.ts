import { Report } from "./report";
import { StoreOwner } from "./storeOwner";
import { User } from "./user";

export interface Review {
    reviewID: number;
    ownerID: number;
    reportID: number;
    theifName: string;
    theifNatID: number;
    theifMobile: number;
    theifPicture: File;
    additional_info: string;
    Owner: StoreOwner;
    Report: Report;
}
