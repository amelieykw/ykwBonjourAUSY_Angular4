"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RDV = (function () {
    function RDV(civilite, prenom_candidate, nom_candidate, nom_recruiteur, hour, minute) {
        this.civilite = civilite;
        this.prenom_candidate = prenom_candidate;
        this.nom_candidate = nom_candidate;
        this.nom_recruiteur = nom_recruiteur;
        this.hour = hour;
        this.minute = minute;
    }
    return RDV;
}());
exports.RDV = RDV;
