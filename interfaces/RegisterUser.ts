export interface UserAddress{

    street: string,
    house_number: string,
    city: string,
    state: string,
    country: string,
    postal_code: string

}

export interface RegisterUser{
    fName:string;
    lName:string;
    email:string;
    password:string;
    address: UserAddress
}