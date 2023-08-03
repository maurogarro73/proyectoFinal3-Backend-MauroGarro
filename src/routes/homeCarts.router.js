import express from 'express';
import { CartClass } from '../DAO/classes/carts.class.js';
import { isCartOwner, isUser } from '../middleware/auth.js';

const cartClass = new CartClass();

export const cartsHtml = express.Router();

cartsHtml.get('/:cid', isUser, isCartOwner, async (req, res) => {
  try {
    const { cid } = req.params;
    const cartFound = await cartClass.findCartById(cid);
    if (!cartFound) {
      throw new Error('Cart not found');
    }

    const idCart = cartFound._id;

    let cart = cartFound.products.map((item) => {
      return {
        title: item._id.title,
        price: item._id.price,
        quantity: item.quantity,
      };
    });

    return res.status(200).render('carts', { cart: cart, idCart });
  } catch (error) {
    console.log(error);
  }
});

cartsHtml.get('/:cid/purchese', async (req, res) => {
  try {
    const { cid } = req.params;
    const cartFound = await cartClass.findCartById(cid);
    if (!cartFound) {
      throw new Error('Cart not found');
    }

    const idCart = cartFound._id;

    let cart = cartFound.products.map((item) => {
      return {
        title: item._id.title,
        price: item._id.price,
        quantity: item.quantity,
      };
    });

    return res.status(200).render('purchese', { cart: cart, idCart });
  } catch (error) {
    console.log(error);
  }
});
