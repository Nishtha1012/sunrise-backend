const cartSchema = `#graphql
  scalar JSON

  type Query {
    getCartProducts(cartId:String): cartItems
  }

  type Mutation{
    createGeneralCart(cartId:String): cartData
    addProductToCart(cartInput:cartInput):JSON
  }
  input cartInput{
    cartId:String 
    cartVersion:String 
    productId:String
    }

  type cartData{
  id:String
  exists:String
  }
  
  type cartItems {
    id: String
    version: Int
    lineItems: [lineItem]
  }

type lineItem{
id:String
name:Name
quantity:Int
price:price
variant:variant
}
  type Name {
    en: String
  }

  type variant {
    images: [img]
    prices: [price]
    attributes: JSON
  }

  type img {
    url: String
  }

  type price {
    value: values
  }

  type values {
    currencyCode: String
    centAmount: Int
  }
`;

module.exports = { cartSchema };
