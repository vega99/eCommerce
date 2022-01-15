class CartItem {
    constructor(id, title, image_url, price, discount, quantity, sum) {
        this.id = id;
        this.title = title;
        this.image_url = image_url;
        this.price = price;
        this.discount = discount;
        this.quantity = quantity;
        this.sum = sum;
    }
}

export default CartItem;
