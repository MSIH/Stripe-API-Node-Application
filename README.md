# stripe-node-server
Node Server to Process Stripe works with WebTask

This implements the customer, charge, and subscrption methods for stripe api version 2017-02-14.

To install in webtask use the following:

npm install wt-cli -g
wt init
wt create filename.js --secret stripeSecretKey=[StripeSecret]
