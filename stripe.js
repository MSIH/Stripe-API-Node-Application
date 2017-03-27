'use latest';

import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';
import stripe from 'stripe';

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//customers
app.post('/customercreate', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.create({
        source: req.body.stripeToken,
        business_vat_id: req.body.business_vat_id,
        coupon: req.body.coupon,
        description: req.body.description,
        email: req.body.email,
        metadata: req.body.metadata,
        shipping: req.body.shipping
    }, (err, customer) => {
        return res.json(customer);
    });
});

app.get('/customerretrieve', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.retrieve(
        req.query.customerid,
        (err, customer) => {
            return res.json(customer);
        });
});

app.post('/customerupdate', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    // Updates the specified customer by setting the values of the parameters passed. Any parameters not provided will be left unchanged. 
    // this logic need to be change. if value undefine then do not include
    stripe(STRIPE_SECRET_KEY).customers.update(req.body.customerid, {
        source: req.body.stripeToken,
        business_vat_id: req.body.business_vat_id,
        coupon: req.body.coupon,
        description: req.body.description,
        email: req.body.email,
        metadata: req.body.metadata,
        shipping: req.body.shipping
    }, (err, customer) => {
        return res.json(customer);
    });
});

app.post('/customerdelete', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.del(
        req.body.customerid,
        (err, customer) => {
            return res.json(customer);
        });
});

app.get('/customerlist', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.list({
            created: req.query.created,
            ending_before: req.query.ending_before,
            limit: req.query.limit,
            starting_after: req.query.starting_after
        },
        (err, customer) => {
            return res.json(customer);
        });
});

//cards
app.post('/cardcreate', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.createSource(
        req.body.customerid, {
            source: req.body.stripeToken,
            metadata: req.body.metadata
        },
        (err, card) => {
            return res.json(card);
        });
});

app.get('/cardretrieve', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.retrieveCard(
        req.query.customerid,
        req.query.cardid,
        (err, card) => {
            return res.json(card);
        });
});

app.post('/cardupdate', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.retrieveCard(
        req.body.customerid,
        req.body.cardid, {
            source: req.body.stripeToken
        },
        (err, card) => {
            return res.json(card);
        });
});

app.post('/carddelete', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.deleteCard(
        req.body.customerid,
        req.body.cardid,
        (err, card) => {
            return res.json(card);
        });
});

//subscriptions
app.post('/subscriptioncreate', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).customers.createSubscription({
        customer: req.body.customer, //required
        plan: req.body.plan,
		application_fee_percent: req.body.application_fee_percent,
        coupon: req.body.coupon,
        items: req.body.items,
        metadata: req.body.metadata,
        plan: req.body.plan,
        prorate: req.body.prorate,
        quantity: req.body.quantity,
        source: req.body.source,
        trial_end: req.body.trial_end,
        trial_period_days: req.body.trial_period_days 
    }, (err, subscription) => {
        return res.json(subscription);
    });
});

app.get('/subscriptionretrieve', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).subscriptions.retrieve(
        req.query.subscriptionid,
        (err, subscription) => {
            return res.json(subscription);
        });
});

app.post('/subscriptionupdate', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).subscriptions.update(
        req.body.subscriptionid, {
            application_fee_percent: req.body.application_fee_percent,
            coupon: req.body.coupon,
            items: req.body.items,
            metadata: req.body.metadata,
            plan: req.body.plan,
            prorate: req.body.prorate,
            quantity: req.body.quantity,
            source: req.body.source,
            trial_end: req.body.trial_end,
            trial_period_days: req.body.trial_period_days
        }, (err, subscription) => {
            return res.json(subscription);
        });
});

app.post('/subscriptioncancel', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).subscriptions.del(
        req.body.subscriptionid,
        (err, subscription) => {
            return res.json(subscription);
        });
});

//charge
app.post('/chargecreate', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).charges.create({
        amount: req.body.amount,
        currency: req.body.currency,
        application_fee: req.body.application_fee,
        description: req.body.description,
        destination: req.body.destination,
        transfer_group: req.body.transfer_group,
        on_behalf_of: req.body.on_behalf_of,
        metadata: req.body.metadata,
        receipt_email: req.body.receipt_email,
        customer: req.body.customer,
        source: req.body.stripeToken,
        statement_descriptor: req.body.statement_descriptor
    }, (err, charge) => {
        return res.json(charge);
    });
});

app.get('/chargeretrieve', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).charges.retrieve(
        req.query.chargeid,
        (err, charge) => {
            return res.json(charge);
        });
});

app.post('/chargeupdate', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).charges.update(
        req.body.chargeid, {
            amount: req.body.amount,
            currency: req.body.currency,
            application_fee: req.body.application_fee,
            description: req.body.description,
            destination: req.body.destination,
            transfer_group: req.body.transfer_group,
            on_behalf_of: req.body.on_behalf_of,
            metadata: req.body.metadata,
            receipt_email: req.body.receipt_email,
            customer: req.body.customer,
            source: req.body.stripeToken,
            statement_descriptor: req.body.statement_descriptor
        }, (err, charge) => {
            return res.json(charge);
        });
});


app.get('/chargelist', (req, res) => {
    var ctx = req.webtaskContext;
    var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
    stripe(STRIPE_SECRET_KEY).charges.list({
            created: req.query.created,
            customer: req.query.customer,
            ending_before: req.query.ending_before,
            limit: req.query.limit,
            source: req.query.stripeToken,
            starting_after: req.query.starting_after,
            transfer_group: req.query.transfer_group
        },
        (err, charge) => {
            return res.json(charge);
        });
});

module.exports = fromExpress(app);