"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var standalone_1 = require("@ionic/angular/standalone");
var storage_angular_1 = require("@ionic/storage-angular");
var app_routes_1 = require("./app/app.routes");
var app_component_1 = require("./app/app.component");
var environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_1.bootstrapApplication(app_component_1.AppComponent, {
    providers: [
        { provide: router_1.RouteReuseStrategy, useClass: standalone_1.IonicRouteStrategy },
        core_1.importProvidersFrom(storage_angular_1.IonicStorageModule.forRoot()),
        standalone_1.provideIonicAngular(),
        router_1.provideRouter(app_routes_1.routes),
    ]
});
