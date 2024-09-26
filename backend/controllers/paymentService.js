const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    const { amount, token } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: amount * 100, // Stripe works with cents
            currency: 'gbp',
            source: token,
            description: 'Service payment for Salem Cleaning',
        });
        res.status(200).json({ message: 'Payment successful', charge });
    } catch (error) {
        res.status(500).json({ message: 'Payment failed', error });
    }
};
