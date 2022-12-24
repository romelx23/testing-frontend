export interface OrderSellInterface {
    ok:      boolean;
    message: string;
    total:   number;
    orders:  Order[];
}

export interface Order {
    items:     Item[];
    _id:       string;
    products?: string[];
    user:      string;
    provider:  string;
}

export interface Item {
    _id:      string;
    product:  string;
    quantity: number;
    __v:      number;
}