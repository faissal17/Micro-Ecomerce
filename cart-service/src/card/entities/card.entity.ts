export class Card {
    id: number;
    productId: number;
    quantity: number;
    userId: number;
    priceTotal: number;

    constructor(userId: number, productId: number, quantity: number, priceTotal: number) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.priceTotal = priceTotal;
    }

    // constructor(partial: Partial<Card>) {
    //     Object.assign(this, partial);
    // }
}
