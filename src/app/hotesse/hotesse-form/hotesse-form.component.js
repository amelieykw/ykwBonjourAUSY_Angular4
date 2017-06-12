"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RDV_model_1 = require("../../models/RDV.model");
var HotesseFormComponent = (function () {
    function HotesseFormComponent(serverService) {
        this.serverService = serverService;
        this.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        this.minutes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
        this.civilites = ['Mr', 'Mme'];
        this.userInput = {
            civilite: '',
            prenom_candidate: '',
            nom_candidate: '',
            nom_recruiteur: '',
            hour: 0,
            minute: 0
        };
    }
    HotesseFormComponent.prototype.onSubmit = function () {
        console.log(this.hotesseForm);
        this.userInput.civilite = this.hotesseForm.value.civilite;
        this.userInput.prenom_candidate = this.hotesseForm.value.prenom_candidate;
        this.userInput.nom_candidate = this.hotesseForm.value.nom_candidate;
        this.userInput.nom_recruiteur = this.hotesseForm.value.nom_recruiteur;
        this.userInput.hour = this.hotesseForm.value.hour;
        this.userInput.minute = this.hotesseForm.value.minute;
        var newRDV = new RDV_model_1.RDV(this.userInput.civilite, this.userInput.prenom_candidate, this.userInput.nom_candidate, this.userInput.nom_recruiteur, this.userInput.hour, this.userInput.minute);
        this.serverService.storeRDV(newRDV)
            .subscribe(function (response) { return console.log(response); }, function (error) { return console.log(error); });
    };
    return HotesseFormComponent;
}());
__decorate([
    core_1.ViewChild('f')
], HotesseFormComponent.prototype, "hotesseForm", void 0);
HotesseFormComponent = __decorate([
    core_1.Component({
        selector: 'app-hotesse-form',
        templateUrl: './hotesse-form.component.html',
        styleUrls: ['./hotesse-form.component.css']
    })
], HotesseFormComponent);
exports.HotesseFormComponent = HotesseFormComponent;
