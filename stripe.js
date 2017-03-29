'use latest';
import express from 'express';
import {
    fromExpress
} from 'webtask-tools';
import bodyParser from 'body-parser';
import stripe from 'stripe@4.14.0';
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Resources as of 20170328
//Balance
//Charge - 20170328
//Customers - 20170328
//Disputes
//Events
//File Uploads
//Refunds
//Tokens
//Transfers
//Transfer Reverals
//Account
//Application Fee Refunds
//Application Fees
//Receipts
//Country Specs
//External Accounts
//Alipay
//Bank
//Cards - 20170328
//Sources
//Orders
//Order items
//Returns
//Products
//SKUs
//Coupons
//Discounts
//Invoices
//Invoice items
//Plans
//Subscriptions - 20170328
//Subscription items



// m method
// p path
// r resource
// f function
// a arguments

function s(data) {
    app[data.m]("/" + data.r + "/" + data.f, (req, res) => {
        var ctx = req.webtaskContext;
        const STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;
        const stripe = stripePackage(STRIPE_SECRET_KEY);
        stripe[data.r][data.f](data.a(req), (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        });
    });
}

//customers
s({
    m: "post",
    r: "customers",
    f: "create",
    a: q => ({
        source: q.body.stripeToken,
        business_vat_id: q.body.business_vat_id,
        coupon: q.body.coupon,
        description: q.body.description,
        email: q.body.email,
        metadata: q.body.metadata,
        shipping: q.body.shipping
    })
});

s({
    m: "get",
    r: "customers",
    f: "retrieve",
    a: q => (q.query.customerid)
});

s({
    m: "post",
    r: "customers",
    f: "update",
    a: q => (q.body.customerid, {
        source: q.body.stripeToken,
        business_vat_id: q.body.business_vat_id,
        coupon: q.body.coupon,
        description: q.body.description,
        email: q.body.email,
        metadata: q.body.metadata,
        shipping: q.body.shipping
    })
});

s({
    m: "post",
    r: "customers",
    f: "del",
    a: q => (q.query.customerid)
});

s({
    m: "get",
    r: "customers",
    f: "list",
    a: q => ({
        created: q.query.created,
        ending_before: q.query.ending_before,
        limit: q.query.limit,
        starting_after: q.query.starting_after
    })
});

//card
s({
    m: "post",
    r: "customers",
    f: "createSource",
    a: q => (q.body.customerid, {
        source: q.body.stripeToken,
        metadata: q.body.metadata
    })
});

s({
    m: "get",
    r: "customers",
    f: "retrieveCard",
    a: q => (q.query.customerid,
        q.query.cardid)
});

s({
    m: "post",
    r: "customers",
    f: "updateCard",
    a: q => (q.query.customerid,
        q.query.cardid, {
            address_city: q.body.address_city,
            address_country: q.body.address_country,
            address_line1: q.body.address_line1,
            address_line2: q.body.address_line2,
            address_state: q.body.address_state,
            address_zip: q.body.address_zip,
            exp_month: q.body.exp_month,
            exp_year: q.body.exp_year,
            metadata: q.body.metadata,
            name: q.body.name
        })
});

s({
    m: "post",
    r: "customers",
    f: "deleteCard",
    a: q => (q.query.customerid,
        q.query.cardid)
});

s({
    m: "get",
    r: "customers",
    f: "listCards",
    a: q => (
        q.query.customer, {
            ending_before: q.query.ending_before,
            limit: q.query.limit,
            starting_after: q.query.starting_after
        })
});


//subscription
s({
    m: "post",
    r: "subscriptions",
    f: "create",
    a: q => ({
        customer: q.body.customer, //required
        plan: q.body.plan,
        application_fee_percent: q.body.application_fee_percent,
        coupon: q.body.coupon,
        items: q.body.items,
        metadata: q.body.metadata,
        plan: q.body.plan,
        prorate: q.body.prorate,
        quantity: q.body.quantity,
        source: q.body.source,
        trial_end: q.body.trial_end,
        trial_period_days: q.body.trial_period_days
    })
});

s({
    m: "get",
    r: "subscriptions",
    f: "retrieve",
    a: q => (q.query.subscriptionid)
});

s({
    m: "post",
    r: "subscriptions",
    f: "update",
    a: q => (q.body.subscriptionid, {
        plan: q.body.plan,
        application_fee_percent: q.body.application_fee_percent,
        coupon: q.body.coupon,
        items: q.body.items,
        metadata: q.body.metadata,
        plan: q.body.plan,
        prorate: q.body.prorate,
        quantity: q.body.quantity,
        source: q.body.source,
        trial_end: q.body.trial_end,
        trial_period_days: q.body.trial_period_days
    })
});

s({
    m: "post",
    r: "subscriptions",
    f: "del",
    a: q => (q.query.subscriptionid)
});

s({
    m: "get",
    r: "subscriptions",
    f: "list",
    a: q => ({
        customer: q.query.customer,
        ending_before: q.query.ending_before,
        limit: q.query.limit,
        starting_after: q.query.starting_after,
        plan: q.query.plan,
        status: q.query.status
    })
});

module.exports = fromExpress(app);