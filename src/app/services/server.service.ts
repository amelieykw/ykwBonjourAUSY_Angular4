import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { RDV } from "../models/RDV.model";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';

const baseHTTPurl: string = 'http://192.168.99.100:8080';

@Injectable()
export class ServerService {
  
  	constructor(
      private http: Http,
      private authenticationService: AuthenticationService
    ) {}

    storeRDV(newRDV: RDV) {
    	const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
    	return this.http.post(
      		baseHTTPurl+'/hotesse/create_newRDV.php',
      		newRDV,
      		{headers: headers});
    }

    valideRdvByHotesse(selectedRdvId: number) {
      const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
      return this.http.post(
          baseHTTPurl+'/hotesse/valide_one_rdv_by_hotesse.php',
          selectedRdvId,
          {headers: headers});
    }

    annulerRdvByHotesse(selectedRdvId: number) {
      const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
      return this.http.post(
          baseHTTPurl+'/hotesse/annuler_one_rdv_by_hotesse.php',
          selectedRdvId,
          {headers: headers});
    }

    validePriseEnChargeByHotesse(selectedRdvId: number) {
      const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
      return this.http.post(
          baseHTTPurl+'/hotesse/valide_one_Prise_En_Charge_by_hotesse.php',
          selectedRdvId,
          {headers: headers});
    }

    supprimerRdvByHotesse(selectedRdvId: number) {
      const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
      return this.http.post(
          baseHTTPurl+'/hotesse/supprimer_one_rdv_by_hotesse.php',
          selectedRdvId,
          {headers: headers});
    }

    annulerPriseEnChargeByHotesse(selectedRdvId: number) {
      const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
      return this.http.post(
          baseHTTPurl+'/hotesse/annuler_one_Prise_En_Charge_by_hotesse.php',
          selectedRdvId,
          {headers: headers});
    }

    sendEmailAlter(emailUsage: string, selectedRdvId: number) {
      const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
      return this.http.post(
          baseHTTPurl+'/hotesse/send_Email_alter.php',
          {'emailUsage':emailUsage, 'selectedRdvId':selectedRdvId},
          {headers: headers});
    }

    getAllContactsForHotesseForm(){
      const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
    	return this.http.get(baseHTTPurl+'/hotesse/get_all_contact.php', { headers: headers })
    		.map(
    			(response : Response) => {
    				const data = response.json();
    				return data;
    			}
    		);
    }

    getAllRdvsInfo() {
      const headers = new Headers({
        'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8',
        'Authorization':this.authenticationService.token
      });
      return this.http.get(baseHTTPurl+'/hotesse/get_all_rdvs.php', { headers: headers })
        .map(
          (response : Response) => {
            const data = response.json();
            return data;
          }
        );
    }   
}
