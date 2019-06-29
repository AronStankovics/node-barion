const {
    StartPayment,
    GetPaymentState,
    FinishReservation,
    PaymentRefund,
    BankTransfer,
    SendTransfer
} = require('./domain');

/**
 * Information that are necessary to call Barion API.
 */
module.exports = {
    baseUrls: {
        test: 'https://api.test.barion.com',
        prod: 'https://api.barion.com'
    },
    immutableFields: [ 'POSKey' ],
    constraints: {
        Currency: [
            'CZK',
            'EUR',
            'HUF',
            'USD'
        ],
        FundingSources: [
            'All',
            'Balance'
        ],
        Locale: [
            'cs-CZ',
            'de-DE',
            'en-US',
            'es-ES',
            'fr-FR',
            'hu-HU',
            'sk-SK',
            'sl-SI',
            'el-GR'
        ]
    },
    endPoints: {
        startPayment: {
            method: 'POST',
            path: '/v2/Payment/Start',
            model: StartPayment
        },
        getPaymentState: {
            method: 'GET',
            path: '/v2/Payment/GetPaymentState',
            model: GetPaymentState
        },
        finishReservation: {
            method: 'POST',
            path: '/v2/Payment/FinishReservation',
            model: FinishReservation
        },
        refundPayment: {
            method: 'POST',
            path: '/v2/Payment/Refund',
            model: PaymentRefund
        },
        bankTransfer: {
            method: 'POST',
            path: '/v2/Withdraw/BankTransfer',
            model: BankTransfer
        },
        barionTransfer: {
            method: 'POST',
            path: '/v1/Transfer/Send',
            model: SendTransfer
        }
    }
};
