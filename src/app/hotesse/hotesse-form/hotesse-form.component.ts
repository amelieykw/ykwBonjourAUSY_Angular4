import { OnInit, Component, OnChanges} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Response } from "@angular/http";
import { Router } from "@angular/router";
import { MdSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { ServerService } from "../../services/server.service";

import { RDV } from "../../models/RDV.model";
import { Manager } from '../../models/Managers.model';

@Component({
  selector: 'app-hotesse-form',
  templateUrl: './hotesse-form.component.html',
  styleUrls: ['./hotesse-form.component.css']
})
export class HotesseFormComponent implements OnInit {

  hours: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  minutes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
  civilites: string[] = ['Mr', 'Mme'];
  newRdvForm: FormGroup;
  managers: Manager[] = [];
  filtered_nom_recruiteur: Observable<Manager[]>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private serverService: ServerService,
    private snackBar: MdSnackBar) { 
    this.createForm();
  }

  createForm() {
    this.newRdvForm = this.fb.group({
      civilite: ['', Validators.required],
      prenom_candidat: ['', Validators.required],
      nom_candidat: ['', Validators.required],
      recruiteur: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required]
    })
  }

  ngOnInit() {
      this.garderInfoEnteredInFormInSessionStorage();

      this.getAllContactsForHotesseForm();

      this.filtered_nom_recruiteur = this.newRdvForm.get('recruiteur').valueChanges
          .startWith(null)
          .map(manager => manager && typeof manager === 'object' ? manager.nom_manager : manager)
          .map(name => name ? this.filter(name) : this.managers.slice());
  }

  focusOutFunction(formElementName: string) {
    sessionStorage.setItem(formElementName, this.newRdvForm.get(formElementName).value);
  }

  clickButton(userSelectedBtn: string) {
    // Path
    switch (userSelectedBtn) {
      case "nouveauRDVbtn":
        this.router.navigate(['/hotesse/create_nouveau_rdv']);
        break;
      case "listeDesRDVbtn":
        this.router.navigate(['/hotesse/liste_des_rdvs']);
        break;     
      default:
        break;
    }
  }

  getAllContactsForHotesseForm() {
      this.serverService.getAllContactsForHotesseForm()
        .subscribe(
          (datas : any[]) => {
              for(let data of datas) {
                  this.managers.push(new Manager(data.ContactId, data.Prenom+" "+data.Nom));
              }
          },
          (error) => console.log(error)
      );
  }

  filter(name: string): Manager[] {
      return this.managers.filter(manager => new RegExp(`^${name}`, 'gi').test(manager.nom_manager)); 
  }

  displayFn(manager: Manager): string {
        return manager ? manager.nom_manager : "";
   }
 
  onSubmit(selectedDataId : number) {

    const newRDV = new RDV(
      this.newRdvForm.get('civilite').value,
      this.newRdvForm.get('prenom_candidat').value,
      this.newRdvForm.get('nom_candidat').value,
      +this.newRdvForm.get('recruiteur').value.ContactId,
      this.newRdvForm.get('hour').value,
      this.newRdvForm.get('minute').value
    );

    this.serverService.storeRDV(newRDV)
      .subscribe(
        (response) => {
          this.newRdvForm.reset();
          this.clearInfoInSessionStorage();
          this.router.navigate(['/hotesse/liste_des_rdvs']);
        },
        (error) => {
          this.snackBar.open(
            'Échec lors de la création du rendez-vous\nRéessayez ou vérifiez que vous êtes connecté à Internet', 
            '', 
            {
              duration: 2000
            }); 
        }
      );
  }

    garderInfoEnteredInFormInSessionStorage() {
    if(sessionStorage.getItem('civilite')) {
        this.newRdvForm.patchValue({
          civilite: sessionStorage.getItem('civilite')
        });
    }
    if(sessionStorage.getItem('prenom_candidat')) {
        this.newRdvForm.patchValue({
          prenom_candidat: sessionStorage.getItem('prenom_candidat')
        });
    }
    if(sessionStorage.getItem('nom_candidat')) {
        this.newRdvForm.patchValue({
          nom_candidat: sessionStorage.getItem('nom_candidat')
        });
    }
    if(sessionStorage.getItem('hour')) {
        this.newRdvForm.patchValue({
          hour: sessionStorage.getItem('hour')
        });
    }
    if(sessionStorage.getItem('minute')) {
        this.newRdvForm.patchValue({
          minute: sessionStorage.getItem('minute')
        });
    }
  }

  clearInfoInSessionStorage() {
    if(sessionStorage.getItem('civilite')) {
        sessionStorage.removeItem('civilite');
    }
    if(sessionStorage.getItem('prenom_candidat')) {
        sessionStorage.removeItem('prenom_candidat');
    }
    if(sessionStorage.getItem('nom_candidat')) {
        sessionStorage.removeItem('nom_candidat');
    }
    if(sessionStorage.getItem('hour')) {
        sessionStorage.removeItem('hour');
    }
    if(sessionStorage.getItem('minute')) {
        sessionStorage.removeItem('minute');
    }
  }

}
