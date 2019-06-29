const Joi = require('@hapi/joi');
const TransactionToFinish = require('./common/TransactionToFinish');

/**
 * Used to finalize a pending reservation in the Barion system.
 *
 * @see {@link https://docs.barion.com/Payment-FinishReservation-v2|Barion API Documentation}
 */
const schema = Joi.object({
    POSKey: Joi.string().required()
        .guid(),
    PaymentId: Joi.string().required()
        .guid(),
    Transactions: Joi.array().required()
        .items(TransactionToFinish)
        .min(1)
})
    .rename(/^POSKey$/i, 'POSKey', { override: true })
    .rename(/^PaymentId$/i, 'PaymentId', { override: true })
    .rename(/^Transactions$/i, 'Transactions', { override: true });

module.exports = schema;
