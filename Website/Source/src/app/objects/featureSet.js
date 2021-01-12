"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Satellite = /** @class */ (function () {
    function Satellite() {
    }
    return Satellite;
}());
exports.Satellite = Satellite;
var Property = /** @class */ (function () {
    function Property() {
        this.satellites = [];
    }
    return Property;
}());
exports.Property = Property;
var FeaturesCollection = /** @class */ (function () {
    function FeaturesCollection() {
        this.features = [];
    }
    return FeaturesCollection;
}());
exports.FeaturesCollection = FeaturesCollection;
var AppFeature = /** @class */ (function () {
    function AppFeature() {
        this.geometry = new appGeometry();
    }
    return AppFeature;
}());
exports.AppFeature = AppFeature;
var appGeometry = /** @class */ (function () {
    function appGeometry() {
        this.coordinates = [];
    }
    return appGeometry;
}());
exports.appGeometry = appGeometry;
//# sourceMappingURL=featureSet.js.map