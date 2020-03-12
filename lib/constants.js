const {
    StartPayment,
    GetPaymentState,
    FinishReservation,
    CapturePayment,
    CancelAuthorization,
    PaymentRefund,
    BankTransfer,
    SendTransfer,
    GetAccounts
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
        captureAuthorizedPayment: {
            method: 'POST',
            path: '/v2/Payment/Capture',
            model: CapturePayment
        },
        cancelAuthorizedPayment: {
            method: 'POST',
            path: '/v2/Payment/CancelAuthorization',
            model: CancelAuthorization
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
        },
        getAccounts: {
            method: 'GET',
            path: '/v2/Accounts/Get',
            model: GetAccounts
        }
    }
};
