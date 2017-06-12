import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RDV} from "../models/RDV.model";

@Injectable()
export class ServerService {
  constructor(private http: Http) {}

  storeRDV(newRDV : RDV) {
    return this.http.post('http://192.168.99.100:8080/hotesse/create_newRDV.php',newRDV);
  }
}
