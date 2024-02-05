"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CountryDetailsPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var common_1 = require("@angular/common");
var currency_converter_1 = require("../currency-converter/currency-converter");
var forms_1 = require("@angular/forms");
var CountryDetailsPage = /** @class */ (function () {
    function CountryDetailsPage(cs, ws, exchangeRateService, converter) {
        this.cs = cs;
        this.ws = ws;
        this.exchangeRateService = exchangeRateService;
        this.converter = converter;
        this.countryDetails = {};
        this.attributeNames = [];
        this.amount = 0;
        this.baseCurrency = '';
        this.convertedAmount = 0;
        this.isButtonDisabled = true;
        this.currency = '';
    }
    // Lifecycle hook when component is initialized
    CountryDetailsPage.prototype.ngOnInit = function () { };
    // Lifecycle hook when the view is about to be entered
    CountryDetailsPage.prototype.ionViewWillEnter = function () {
        this.getCountryDetails();
    };
    // Method to fetch country details
    CountryDetailsPage.prototype.getCountryDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, currencyCodes, latlng, latitude, longitude;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.cs.get('selectedCountry')];
                    case 1:
                        _a.countryDetails = _b.sent();
                        this.attributeNames = Object.keys(this.countryDetails);
                        console.log(this.countryDetails);
                        // Set baseCurrency to the first currency code if available
                        if (this.countryDetails.currencies) {
                            currencyCodes = Object.keys(this.countryDetails.currencies);
                            if (currencyCodes.length > 0) {
                                this.baseCurrency = currencyCodes[0];
                            }
                        }
                        // Fetch weather data using the coordinates from the selected country
                        if (this.countryDetails.capitalInfo && this.countryDetails.capitalInfo.latlng) {
                            latlng = this.countryDetails.capitalInfo.latlng;
                            latitude = latlng[0];
                            longitude = latlng[1];
                            // Fetch weather data
                            this.ws.getWeatherData(latlng).then(function (weatherData) {
                                console.log('Weather API Response:', weatherData);
                                _this.countryDetails.weatherDescription = weatherData.data.description;
                            });
                        }
                        else {
                            console.log('latlng is not defined or has an incorrect structure.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Method to get currencies from the given object
    CountryDetailsPage.prototype.getCurrencies = function (currencies) {
        if (currencies) {
            return Object.keys(currencies);
        }
        return [];
    };
    // Method to get the symbol of the first currency
    CountryDetailsPage.prototype.getFirstCurrencySymbol = function (currencies) {
        var currencyCodes = this.getCurrencies(currencies);
        if (currencyCodes.length > 0) {
            var firstCurrencyCode = currencyCodes[0];
            return currencies[firstCurrencyCode].symbol;
        }
        return undefined;
    };
    // Method to convert currency
    CountryDetailsPage.prototype.convertCurrency = function () {
        this.converter.convertToEUR();
    };
    // Method to handle amount change
    CountryDetailsPage.prototype.onAmountChange = function (event) {
        this.amount = event;
        this.isButtonDisabled = !this.amount;
    };
    // Method to convert currency to EUR
    CountryDetailsPage.prototype.convertToEUR = function () {
        var _this = this;
        this.exchangeRateService.getExchangeRate(this.baseCurrency).then(function (response) {
            var rate = response.data.conversion_rates.EUR;
            _this.convertedAmount = _this.amount * rate;
        });
    };
    // Method to convert currency using the converter service
    CountryDetailsPage.prototype.convertCurrencyWithConverter = function () {
        var _this = this;
        if (this.amount && this.baseCurrency) {
            // Create a new instance of CurrencyConverter
            var converter = new currency_converter_1.CurrencyConverter(this.exchangeRateService);
            // Use the CurrencyConverter methods
            converter.setAmount(this.amount);
            converter.setBaseCurrency(this.baseCurrency);
            // Call the conversion method
            var conversionPromise = converter.convertToEUR();
            // Handle the promise
            conversionPromise
                .then(function (result) {
                // Use the result as needed
                console.log('Converted Amount:', result);
                _this.convertedAmount = result;
            })["catch"](function (error) {
                console.error('Error during conversion:', error);
            });
        }
        else {
            console.error('Amount or baseCurrency is not provided.');
        }
    };
    // Method to get languages from the given object
    CountryDetailsPage.prototype.getLanguages = function (languages) {
        if (languages) {
            return Object.keys(languages).map(function (key) { return languages[key]; });
        }
        return [];
    };
    CountryDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-country-details',
            templateUrl: './country-details.page.html',
            styleUrls: ['./country-details.page.scss'],
            standalone: true,
            imports: [angular_1.IonicModule, common_1.CommonModule, forms_1.FormsModule, currency_converter_1.CurrencyConverter]
        })
    ], CountryDetailsPage);
    return CountryDetailsPage;
}());
exports.CountryDetailsPage = CountryDetailsPage;
