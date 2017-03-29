'use latest';
import express from 'express';
import {
    fromExpress
} from 'webtask-tools';
import bodyParser from 'body-parser';
import stripePackage from 'stripe@4.14.0';
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Resources as of 20170328
//Balance - 20170328
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

//Balance
s({
    m: "get",
    r: "balance",
    f: "retrieve",
    a: q => ({})
});

s({
    m: "get",
    r: "balance",
    f: "retrieveTransaction",
    a: q => (q.query.transactionid)
});

s({
    m: "get",
    r: "balance",
    f: "listTransactions",
    a: q => (q.body.customerid, {
        available_on: q.body.available_on,
        created: q.body.created,
        currency: q.body.currency,
        ending_before: q.body.ending_before,
        limit: q.body.limit,
        source: q.body.source,
        starting_after: q.body.starting_after,
        transfer: q.body.transfer,
        type: q.body.type
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

//charge
s({
    m: "post",
    r: "charges",
    f: "create",
    a: q => ({
        amount: q.body.amount,
        currency: q.body.currency,
        application_fee: q.body.application_fee,
        capture: q.body.capture,
        description: q.body.description,
        transfer_group: q.body.transfer_group,
        on_behalf_of: q.body.on_behalf_of,
        metadata: q.body.metadata,
        receipt_email: q.body.receipt_email,
        shipping: q.body.shipping,
        customer: q.body.customer,
        source: q.body.source,
        statement_descriptor: q.body.statement_descriptor
    })
});

s({
    m: "get",
    r: "charges",
    f: "retrieve",
    a: q => (q.query.chargeid)
});

s({
    m: "post",
    r: "charges",
    f: "update",
    a: q => (q.body.chargeid, {
        description: q.body.description,
        metadata: q.body.metadata,
        receipt_email: q.body.receipt_email,
        shipping: q.body.shipping,
        fraud_details: q.body.fraud_details
    })
});

s({
    m: "post",
    r: "charges",
    f: "capture",
    a: q => (q.body.chargeid, {
        capture: q.body.capture,
        application_fee: q.body.application_fee,
        receipt_email: q.body.receipt_email,
        statement_descriptor: q.body.statement_descriptor
    })
});


s({
    m: "get",
    r: "charges",
    f: "list",
    a: q => ({
        created: q.query.created,
        ending_before: q.query.ending_before,
        limit: q.query.limit,
        customer: q.query.customer,
        source: q.query.source,
        starting_after: q.query.starting_after,
        transfer_group: q.query.transfer_group
    })
});


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