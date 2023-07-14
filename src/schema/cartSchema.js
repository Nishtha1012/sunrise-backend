const cartSchema = `#graphql
  scalar JSON

  type Query {
    getCartProducts(cartId:String): cartItems
  }

  type Mutation{
    createGeneralCart(cartId:String): cartData
    addProductToCart(cartInput:cartInput):JSON
    removeFromCart(cartInput:cartInput):JSON
    addCustomerEmail(input:cartEmailInput):JSON
    addShippingAddress(shippingInput:shippingAddress):JSON
  }

  input shippingAddress{
    cartId:String 
    cartVersion:String 
    fitstName:String
    lastName:String
    streetName:String
    country:String
    city:String
    postalCode:String
    phone:String
  }

  input cartEmailInput{
    cartId:String 
    cartVersion:String 
    email:String
  }

  input cartInput{
    cartId:String 
    cartVersion:String 
    productId:String
    }

  type remove{
    deleted:String
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
