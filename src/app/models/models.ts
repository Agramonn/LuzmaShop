export interface Category {
    id: number;
    category: string;
    subCategory: string;
}

export interface SuggestedProduct {
    banerimage: string;
    category: Category;
}

export interface NavigationItem {
    category: string;
    subCategories: string[];
}

export interface Offer {
    id: number;
    title: string;
    discount: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    productCategory: Category;
    offer: Offer;
    price: number;
    quantity: number;
    imageName: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    mobile: string;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: number;
    user: User;
    product: Product;
    value: string;
    createdAt: string;
}

export interface UserCartItem {
    id: number;
    product: Product;
}

export interface UserCart{
    id: number;
    user: User;
    cartItems: UserCartItem[];
    ordered: boolean;
    orderedOn: string;
}

export interface PaymentMethod{
    id: number;
    type: string;
    provider: string;
    available: boolean;
    reason: string;
}

export interface Payment{
    id: number;
    user: User;
    paymentMethod: PaymentMethod;
    totalAmount: number;
    shipingCharges: number;
    amountReduced: number;
    amountPaid: number;
    createdAt: string;
}

export interface Order {
    id: number;
    user: User;
    userCart: UserCart;
    payment: Payment;
    createdAt: string;
}