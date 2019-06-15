const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
const spies = require('chai-spies');
chai.use(chaiAsPromised);
chai.use(spies);

const { BarionError } = require('../lib/errors');
const { baseUrls } = require('../lib/constants');

/*
 * Mocks.
 */
let serviceMocks = {
    /*
     * Request succeeded.
     */
    okService: proxyquire('../lib/services', {
        './fetch-api': {
            postToBarion: () => Promise.resolve({ success: true, answer: 'example' }),
            getFromBarion: () => Promise.resolve({ success: true, answer: 'example' })
        }
    }),
    /*
     * Request ended in error.
     */
    errorService: proxyquire('../lib/services', {
        './fetch-api': {
            postToBarion: () => Promise.reject(new BarionError('Barion request errored out', [
                { Title: 'Authentication failed.', HappenedAt: '2019-01-19T18:46:51.0808761Z' } 
            ])),
            getFromBarion: () => Promise.reject(new BarionError('Barion request errored out', [
                { Title: 'Authentication failed.', HappenedAt: '2019-01-19T18:46:51.0808761Z' } 
            ]))
        }
    }),
    /*
     * Error occured between client and server.
     */
    networkErrorService: proxyquire('../lib/services', {
        './fetch-api': {
            postToBarion: () => Promise.reject(new Error('Failed to fetch data')),
            getFromBarion: () => Promise.reject(new Error('Failed to fetch data'))
        }
    })
};

describe('lib/services.js', function () {

    describe('#startPayment(environment, options)', function () {
        it('should return a Promise on success', function (done) {
            const services = serviceMocks.okService;
            services.startPayment('test', {})
                .then(data => done())
        });

        it('should return a Promise on failure', function (done) {
            const services = serviceMocks.errorService;
            services.startPayment('test', {})
                .catch(err => done())
        });
    });

    describe('#getPaymentState(environment, options)', function () {
        it('should return a Promise on success', function (done) {
            const services = serviceMocks.okService;
            services.getPaymentState('test', {})
                .then(data => done())
        });

        it('should return a Promise on failure', function (done) {
            const services = serviceMocks.errorService;
            services.getPaymentState('test', {})
                .catch(err => done())
        });
    });

    describe('#finishReservation(environment, options)', function () {
        it('should return a Promise on success', function (done) {
            const services = serviceMocks.okService;
            services.finishReservation('test', {})
                .then(data => done())
        });

        it('should return a Promise on failure', function (done) {
            const services = serviceMocks.errorService;
            services.finishReservation('test', {})
                .catch(err => done())
        });
    });

    describe('#refundPayment(environment, options)', function () {
        it('should return a Promise on success', function (done) {
            const services = serviceMocks.okService;
            services.refundPayment('test', {})
                .then(data => done())
        });

        it('should return a Promise on failure', function (done) {
            const services = serviceMocks.errorService;
            services.refundPayment('test', {})
                .catch(err => done())
        });
    });

    describe('#bankTransfer(environment, options)', function () {
        it('should return a Promise on success', function (done) {
            const services = serviceMocks.okService;
            services.bankTransfer('test', {})
                .then(data => done())
        });

        it('should return a Promise on failure', function (done) {
            const services = serviceMocks.errorService;
            services.bankTransfer('test', {})
                .catch(err => done())
        });
    });

    describe('#barionTransfer(environment, options)', function () {
        it('should return a Promise on success', function (done) {
            const services = serviceMocks.okService;
            services.barionTransfer('test', {})
                .then(data => done())
        });

        it('should return a Promise on failure', function (done) {
            const services = serviceMocks.errorService;
            services.barionTransfer('test', {})
                .catch(err => done())
        });
    });

    describe('#getBaseUrl', function () {
        it('should return test environment\'s URL to pointless input', function () {
            const services = serviceMocks.okService;
            const expectedUrl = baseUrls.test;

            expect(services._private.getBaseUrl()).to.equals(expectedUrl);
            expect(services._private.getBaseUrl(null)).to.equals(expectedUrl);
            expect(services._private.getBaseUrl('')).to.equals(expectedUrl);
            expect(services._private.getBaseUrl({})).to.equals(expectedUrl);
            expect(services._private.getBaseUrl([])).to.equals(expectedUrl);
            expect(services._private.getBaseUrl(5)).to.equals(expectedUrl);
        });

        it('should return the proper base URL to \'test\' and \'prod\'', function () {
            const services = serviceMocks.okService;

            expect(services._private.getBaseUrl('test')).to.equals(baseUrls.test);
            expect(services._private.getBaseUrl('prod')).to.equals(baseUrls.prod);
        });
    });

    describe('#doRequest', function () {

        const sandbox = chai.spy.sandbox();
        const fetchAPI = require('../lib/fetch-api');
        const getFromBarion = sandbox.on(fetchAPI, 'getFromBarion', returns => Promise.resolve({ success: true }));
        const postToBarion = sandbox.on(fetchAPI, 'postToBarion', returns => Promise.resolve({ success: true }));
        const services = require('../lib/services');

        it('should create proper URL', function () {
            services._private.doRequest('test', { method: 'GET', path: '/api/test' }, { some: 'value' });
            expect(getFromBarion).to.have.been.called.with(new URL(`${baseUrls.test}/api/test`), { some: 'value' });
        });

        it('should call fetch-api modules functions based on the given HTTP method', function () {
            services._private.doRequest('test', { method: 'GET', path: '/api/get' }, { key: 'val1' });
            services._private.doRequest('test', { method: 'POST', path: '/api/post' }, { key: 'val2' });

            expect(getFromBarion).to.have.been.called.with(new URL(`${baseUrls.test}/api/get`), { key: 'val1' });
            expect(postToBarion).to.have.been.called.with(new URL(`${baseUrls.test}/api/post`), { key: 'val2' });
        });

        it('should throw error on not supported HTTP method', function () {
            let doRequest = () => services._private.doRequest('test', { method: 'BAZINGA', path: '/api/dumb' }, { some: 'value' });
            expect(doRequest).to.throw(/HTTP method/);
        });
    });
});
