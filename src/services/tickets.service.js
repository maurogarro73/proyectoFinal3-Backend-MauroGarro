export class TicketService {
  async addTicket2(purchaser, ticket1, totalCart) {
    try {
      const ticketData = {
        code: '',
        purchase_datetime: new Date(),
        amount: totalCart,
        purchaser: purchaser,
        products: ticket1,
      };
      let ticket = await TicketModel.create(ticketData);
      let code = ticket._id.toString();
      await TicketModel.findByIdAndUpdate(ticket._id, { code: code });
      return { ticket, code };
    } catch (error) {
      throw `FALLO EN SERVICIO. ${error}`;
    }
  }

  async stockCartProductsForTicket(cartId) {
    try {
      const cartProductsTicket = await cartService.getCartById(cartId);
      let cartWithStock = [];
      let cartWithOutStock = [];
      let totalPriceTicket = 0;

      cartProductsTicket.products.forEach((item) => {
        const idProduct = item.product._id.toString();
        const title = item.product.title;
        const quantityInCart = parseInt(item.quantity);
        const availableStock = parseInt(item.product.stock);
        const ticketAmount = parseInt(item.product.price);

        if (quantityInCart <= availableStock) {
          const totalPriceProduct = ticketAmount * quantityInCart;
          cartWithStock.push({ idProduct, quantity: quantityInCart, totalPrice: totalPriceProduct, title });
          totalPriceTicket += totalPriceProduct;
        } else {
          cartWithOutStock.push({ idProduct, quantity: quantityInCart });
        }
      });

      return { cartWithStock, cartWithOutStock, totalPriceTicket };
    } catch (err) {
      console.log(err);
      throw new Error('ERROR.');
    }
  }
}
