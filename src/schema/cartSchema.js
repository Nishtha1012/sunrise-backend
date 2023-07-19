const cartSchema = `#graphql
  scalar JSON

  type Query {
    getCartProducts(cartId:String): cartItems
    fetchOrders:[orders]
  }

  type Mutation{
    createGeneralCart(cartId:String): cartData
    addProductToCart(cartInput:cartInput):cartItems
    removeFromCart(cartInput:cartInput):cartItems
    addCustomerEmail(input:cartEmailInput):JSON
    addShippingAddress(shippingInput:shippingAddress):JSON
    addBillingAddress(billingInput:shippingAddress):JSON
    addShippingMethod(shippingMethodInput:shippingMethod):JSON
    createOrder(orderInput:orderInput):JSON
  }

  type orders{
    body:order
  }

  type order{
    cart:cart
    createdAt:String
    lineItems:[lineItem]  
    orderState:String
    version:String
    totalPrice:values
 
  }
  type Shipping{
    firstName:String
    lastName:String
    streetName:String
    postalCode:String
    city:String
    phone:String
  }

  type cart{
    id:String
  }

  input orderInput{
    cartId:String,
    cartVersion:String,
  }

  input shippingMethod
  {
    methodId : String,
    cartId:String,
    cartVersion:String
  }

  input shippingAddress{
    cartId:String 
    cartVersion:String 
    firstName:String
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
    totalPrice:total
    taxedPrice:taxprice
    shippingAddress:Shipping
    customerEmail:String
    billingAddress:Shipping
    shippingInfo:shipInfo
  }

  type shipInfo{
    shippingMethodName:String
  }

  type taxprice{
    totalGross:total
    totalTax:total
    totalNet:total
  }

  type total{
    centAmount:String
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
