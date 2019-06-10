const StartPayment = require('./StartPayment');
const GetPaymentState = require('./GetPaymentState');
const FinishReservation = require('./FinishReservation');
const PaymentRefund = require('./PaymentRefund');
const BankTransfer = require('./BankTransfer');
const SendTransfer = require('./SendTransfer');

module.exports = {
    StartPayment,
    GetPaymentState,
    FinishReservation,
    PaymentRefund,
    BankTransfer,
    SendTransfer
};
