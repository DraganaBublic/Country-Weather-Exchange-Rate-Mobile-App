"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var country_details_page_1 = require("./country-details.page");
describe('CountryDetailsPage', function () {
    var component;
    var fixture;
    beforeEach(testing_1.waitForAsync(function () {
        fixture = testing_1.TestBed.createComponent(country_details_page_1.CountryDetailsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
