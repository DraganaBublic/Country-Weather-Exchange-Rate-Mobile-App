"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CurrencyConverter = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter(exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
        this.amount = 0;
        this.baseCurrency = 'USD';
        this.convertedAmount = 0;
        this.isButtonDisabled = true;
    }
    // Method to handle amount change
    CurrencyConverter.prototype.onAmountChange = function () {
        this.isButtonDisabled = !this.amount;
    };
    // Method to convert to EUR and return a promise
    CurrencyConverter.prototype.convertToEUR = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.exchangeRateService
                .getExchangeRate(_this.baseCurrency)
                .then(function (response) {
                var rate = response.data.conversion_rates.EUR;
                var convertedAmount = _this.amount * rate;
                resolve(convertedAmount);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    // Method to set the amount and update button status
    CurrencyConverter.prototype.setAmount = function (amount) {
        this.amount = amount;
        this.onAmountChange(); // Update button status
    };
    // Method to set the base currency and update button status
    CurrencyConverter.prototype.setBaseCurrency = function (baseCurrency) {
        this.baseCurrency = baseCurrency;
        this.onAmountChange(); // Update button status
    };
    __decorate([
        core_1.Input()
    ], CurrencyConverter.prototype, "amount");
    CurrencyConverter = __decorate([
        core_1.Component({
            selector: 'app-currency-converter',
            templateUrl: './currency-converter.html',
            styleUrls: [],
            standalone: true
        }),
        core_2.Injectable({
            providedIn: 'root'
        })
    ], CurrencyConverter);
    return CurrencyConverter;
}());
exports.CurrencyConverter = CurrencyConverter;
