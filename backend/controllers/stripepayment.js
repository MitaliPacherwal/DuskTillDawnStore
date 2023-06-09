const stripe = require("stripe")("sk_test_51NNULqSHdx1DRs8czu653Pwwqa0OdyyAbuURnMsrsEzqRihYjPqW2vbb1Wa3eNhcCDmJv2Lv5Vu1bFlSANsWrWlf00dIkuJjIg")
const uuid = require("uuid")




exports.makepayment = (req,res) =>{
   const {products,token} = req.body
    console.log("PRODUCTS", products)
    let amount = 0;
    products.map(p=>{
        amount = amount +p.price;

    });
//for not charging user again
    const idempotencyKey = uuid()
    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer =>{ //creating a customer
        stripe.charges.create({
            amount: amount * 100,
            currency:'usd',
            customer: customer.id,
            receipt_email: token.email,
            description :`purchase of product.name `,
            shipping :{
                name: token.card.name,
                address:{
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country:token.card.address_country,
                    postal_code :token.card.address_zip
                }
            }
        }, {idempotencyKey})
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})
}