export interface StoreOwner {
    ownerID: number;
    firstName: string;
    lastName: string;
    email: string;
    // reviews_count: string;
    password: string;
    confirmPassword: string;
    mobile: number;
    avatar: string;
    fullInfo: number;
    created_at: Date;
    updated_at: Date;
    Store: {
        storeID: number;
        ownerID: number;
        storeName: string;
        government: string;
        city: string;
        street: string;
        storeMobile_1: number;
        storeMobile_2: number;
        facebookLink: string;
        whatsapp: string;
        created_at: Date;
        updated_at: Date;
    }
}
