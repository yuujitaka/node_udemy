const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  const { total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    //check if the value from the frontend is right
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
