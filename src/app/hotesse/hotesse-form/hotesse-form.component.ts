import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../../services/server.service";
import {RDV} from "../../models/RDV.model";

@Component({
  selector: 'app-hotesse-form',
  templateUrl: './hotesse-form.component.html',
  styleUrls: ['./hotesse-form.component.css']
})
export class HotesseFormComponent{

  hours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  minutes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
  civilites: string[] = ['Mr', 'Mme'];
  userInput = {
    civilite: '',
    prenom_candidate: '',
    nom_candidate: '',
    nom_recruiteur: '',
    hour: 0,
    minute: 0
  };

  @ViewChild('f') hotesseForm: NgForm;

  constructor(private serverService: ServerService) { }

  onSubmit() {
    console.log(this.hotesseForm);
    this.userInput.civilite = this.hotesseForm.value.civilite;
    this.userInput.prenom_candidate = this.hotesseForm.value.prenom_candidate;
    this.userInput.nom_candidate = this.hotesseForm.value.nom_candidate;
    this.userInput.nom_recruiteur = this.hotesseForm.value.nom_recruiteur;
    this.userInput.hour = this.hotesseForm.value.hour;
    this.userInput.minute = this.hotesseForm.value.minute;
    const newRDV = new RDV(
      this.userInput.civilite,
      this.userInput.prenom_candidate,
      this.userInput.nom_candidate,
      this.userInput.nom_recruiteur,
      this.userInput.hour,
      this.userInput.minute
    );
    this.serverService.storeRDV(newRDV)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

}
