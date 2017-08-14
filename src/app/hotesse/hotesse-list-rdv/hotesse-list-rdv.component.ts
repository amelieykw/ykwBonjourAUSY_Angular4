import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { Router } from '@angular/router';
import { Response } from "@angular/http";
import { MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';

import { ServerService } from "../../services/server.service";

import { RdvListRow } from '../../models/RdvListRow.model';

@Component({
  selector: 'app-hotesse-list-rdv',
  templateUrl: './hotesse-list-rdv.component.html',
  styleUrls: ['./hotesse-list-rdv.component.css']
})
export class HotesseListRdvComponent {
	displayedColumns = ['prenom_candidat','nom_candidat','recruiteur','heureDeRdv','valide','priseEnCharge','action'];
	Database = new Database(this.serverService);
	dataSource: LocalDataSource | null;

	@ViewChild(MdSort) sort : MdSort;

  	constructor(
  		private router: Router,
  		private serverService: ServerService,
  		public dialog: MdDialog) {}

	ngOnInit() {
		this.dataSource = new LocalDataSource(this.Database, this.sort);
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

	openDialog(columnName: string, checkboxStatue: any, selectedRdvId: number, prenom_candidat: string, recruiteur: string) {
		switch (columnName) {
			case "valide": {
				this.baseRdv(checkboxStatue, selectedRdvId, prenom_candidat, recruiteur);
				break;
			}
			case "priseEnCharge": {
				this.basePriseEnCharge(checkboxStatue, selectedRdvId, prenom_candidat, recruiteur);
				break;
			}
			case "action": {
				this.supprimerRdv(selectedRdvId, prenom_candidat, recruiteur);
				break;
			}
			default:
				break;
		}
	}

	baseRdv(checkboxStatue: number, selectedRdvId: number, prenom_candidat: string, recruiteur: string) {
  		if (checkboxStatue == 0) {
  			// unchecked => cocher and then change from 0 to 1 => valider
  			this.valideRdv(selectedRdvId, prenom_candidat, recruiteur);
  		} else {
  			// checked => décocher and then change from 1 to 0 => annuler
  			this.annulerRdv(selectedRdvId, prenom_candidat, recruiteur);
  		}
  	}

  	valideRdv(selectedRdvId: number, prenom_candidat: string, recruiteur: string) {
  		let dialogTitleAction = "valider";
		let dialogTitleContent = "le rdv";
		let messageForDialog = {
			"dialogTitle": 'Souhaitez-vous '+dialogTitleAction+' manuellement '+dialogTitleContent+' de '+prenom_candidat+'?',
			"dialogContent": recruiteur+' sera prévenu par email et SMS?',
		};
		let dialogRef = this.dialog.open(DialogAlterComponent, {
		    height: '40%',
		    width: '60%',
		    data: messageForDialog
		});
		dialogRef.afterClosed().subscribe(result => {
	        if(result) {
	       		// true, valider => operation to the data base
		  		this.serverService.valideRdvByHotesse(selectedRdvId)
		 			.subscribe(
				        (response) => {
				        	// refresh the part of rdv list
				        	this.refreshListRdv();
				        	this.serverService.sendEmailAlter("ValidationRdv", selectedRdvId)
						    	.subscribe(
						        	(response) => console.log(response),
						        	(error) => console.log(error)
						    	);
				        },
				        (error) => console.log(error)
				      );
	        } else {
	       		// false, annuler
	       		this.refreshListRdv();
	        }
	    });
  	}

  	annulerRdv(selectedRdvId: number, prenom_candidat: string, recruiteur: string) {
  		let dialogTitleAction = "annuler";
		let dialogTitleContent = "la validation du rdv";
		let messageForDialog = {
			"dialogTitle": 'Souhaitez-vous '+dialogTitleAction+' manuellement '+dialogTitleContent+' de '+prenom_candidat+'?',
			"dialogContent": recruiteur+' sera prévenu par email et SMS?',
		};
		let dialogRef = this.dialog.open(DialogAlterComponent, {
		    height: '40%',
		    width: '60%',
		    data: messageForDialog
		});
		dialogRef.afterClosed().subscribe(result => {
	        if(result) {
	       		// true, valider => operation to the data base
		  		this.serverService.annulerRdvByHotesse(selectedRdvId)
		 			.subscribe(
				        (response) => {
				        	// refresh the part of rdv list
				        	this.refreshListRdv();
				        	this.serverService.sendEmailAlter("AnnulationRdv", selectedRdvId)
						    	.subscribe(
						        	(response) => console.log(response),
						        	(error) => console.log(error)
						    	);
				        },
				        (error) => console.log(error)
				      );
	       } else {
	       		// false, annuler
	       		this.refreshListRdv();
	       }
	    });
  	}

  	basePriseEnCharge(checkboxStatue: string, selectedRdvId: number, prenom_candidat: string, recruiteur: string) {
  		if (checkboxStatue == null) {
  			// unchecked => cocher and then change from 0 to 1 => valider
  			this.validePriseEnCharge(selectedRdvId, prenom_candidat, recruiteur);
  		} else {
  			// checked => décocher and then change from 1 to 0 => annuler
  			this.annulerPriseEnCharge(selectedRdvId, prenom_candidat, recruiteur);
  		}
  	}

  	validePriseEnCharge(selectedRdvId: number, prenom_candidat: string, recruiteur: string) {
  		let dialogTitleAction = "valider";
		let dialogTitleContent = "la prise en charge";
		let messageForDialog = {
			"dialogTitle": 'Souhaitez-vous '+dialogTitleAction+' manuellement '+dialogTitleContent+' de '+prenom_candidat+' par '+recruiteur+'?',
			"dialogContent": '',
		};
		let dialogRef = this.dialog.open(DialogAlterComponent, {
		    height: '40%',
		    width: '60%',
		    data: messageForDialog
		});
		dialogRef.afterClosed().subscribe(result => {
	        if(result) {
	       		// true, valider => operation to the data base
		  		this.serverService.validePriseEnChargeByHotesse(selectedRdvId)
		 			.subscribe(
				        (response) => {
				        	// refresh the part of rdv list
				        	this.refreshListRdv();
				        },
				        (error) => console.log(error)
				      );
	        } else {
	       		// false, annuler
	       		this.refreshListRdv();
	        }
	    });
  	}

  	annulerPriseEnCharge(selectedRdvId: number, prenom_candidat: string, recruiteur: string) {
  		let dialogTitleAction = "annuler";
		let dialogTitleContent = "la prise en charge";
		let messageForDialog = {
			"dialogTitle": 'Souhaitez-vous '+dialogTitleAction+' manuellement '+dialogTitleContent+' de '+prenom_candidat+'?',
			"dialogContent": '',
		};
		let dialogRef = this.dialog.open(DialogAlterComponent, {
		    height: '40%',
		    width: '60%',
		    data: messageForDialog
		});
		dialogRef.afterClosed().subscribe(result => {
	        if(result) {
	       		// true, valider => operation to the data base
		  		this.serverService.annulerPriseEnChargeByHotesse(selectedRdvId)
		 			.subscribe(
				        (response) => {
				        	// refresh the part of rdv list
				        	this.refreshListRdv();
				        },
				        (error) => console.log(error)
				      );
	       } else {
	       		// false, annuler
	       		this.refreshListRdv();
	       }
	    });
  	}

  	supprimerRdv(selectedRdvId: number, prenom_candidat: string, recruiteur: string) {
  		let dialogTitleAction = "supprimer";
		let dialogTitleContent = "le rdv";
		let messageForDialog = {
			"dialogTitle": 'Souhaitez-vous '+dialogTitleAction+' manuellement '+dialogTitleContent+' de '+prenom_candidat+' par '+recruiteur+'?',
			"dialogContent": '',
		};
		let dialogRef = this.dialog.open(DialogAlterComponent, {
		    height: '40%',
		    width: '60%',
		    data: messageForDialog
		});
		dialogRef.afterClosed().subscribe(result => {
	        if(result) {
	       		// true, valider => operation to the data base
		  		this.serverService.supprimerRdvByHotesse(selectedRdvId)
		 			.subscribe(
				        (response) => {
				        	// refresh the part of rdv list
				        	this.refreshListRdv();
				        },
				        (error) => console.log(error)
				      );
	       } else {
	       		// false, annuler
	       }
	    });
  	}

  	refreshListRdv() {
  		this.Database = new Database(this.serverService);
		this.dataSource = new LocalDataSource(this.Database, this.sort);
  	}
}

@Component({
  	selector: 'dialog-alert',
  	template: '<h2 md-dialog-title>{{ data.dialogTitle }}</h2>'
  	+'<md-dialog-content>{{ data.dialogContent }}</md-dialog-content>'
  	+'<md-dialog-actions>'
  	+'<button md-button [md-dialog-close]="true">Confirmer</button>'
  	+'<button md-button [md-dialog-close]="false">Annuler</button>'
  	+'</md-dialog-actions>',
})
export class DialogAlterComponent {
  	constructor(
  		public dialogRef: MdDialogRef<DialogAlterComponent>,
  		@Inject(MD_DIALOG_DATA) public data: any) {
  	}
}

/** An example database that the data source uses to retrieve data for the table. */
export class Database {
  	/** Stream that emits whenever the data has been modified. */
  	dataChange: BehaviorSubject<RdvListRow[]> = new BehaviorSubject<RdvListRow[]>([]);
  	get data(): RdvListRow[] { return this.dataChange.value; }

  	serverService: ServerService;

	constructor(serverService: ServerService) {
  		this.serverService = serverService;
    	this.getAllRdvsInfo();
  	}

  	getAllRdvsInfo() {
	 	this.serverService.getAllRdvsInfo()
	        .subscribe(
	          (datas : any[]) => {
	            for(let data of datas) {
	              	let heurePrevu = data.HeurePrevu != null ? data.HeurePrevu.split(" ")[1].split(":") : null;
	              	let heurePriseEnCharge = data.HeurePriseEnCharge != null ? data.HeurePriseEnCharge.split(" ")[1] : null;
	                const copiedData = this.data.slice();
				    copiedData.push(
				    	new RdvListRow(
				    		data.rdvId,
	                		data.rdvPrenom, 
	                		data.rdvNom, 
	                		data.contactPrenom+" "+data.contactNom, 
	                		heurePrevu[0]+"h"+heurePrevu[1], 
	                		data.isValide, 
	                		heurePriseEnCharge)
	                	);
				    this.dataChange.next(copiedData);
	            }
	        },
	        (error) => console.log(error)
	    );
 	}

}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, Database. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class LocalDataSource extends DataSource<any> {
  constructor(
  	private _Database: Database,
	private _sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RdvListRow[]> {
  	const displayDataChanges = [
  		this._Database.dataChange,
  		this._sort.mdSortChange
  	];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

// displayedColumns = ['prenom_candidat','nom_candidat','recruiteur','heureDeRdv','valide','priseEnCharge','action'];

  /** Returns a sorted copy of the database data. */
  getSortedData(): RdvListRow[] {
    const data = this._Database.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'prenom_candidat': [propertyA, propertyB] = [a.rdvPrenom, b.rdvPrenom]; break;
        case 'nom_candidat': [propertyA, propertyB] = [a.rdvNom, b.rdvNom]; break;
        case 'recruiteur': [propertyA, propertyB] = [a.contact, b.contact]; break;
        case 'heureDeRdv': [propertyA, propertyB] = [a.HeurePrevu, b.HeurePrevu]; break;
        case 'valide': [propertyA, propertyB] = [a.isValide, b.isValide]; break;
        case 'priseEnCharge': [propertyA, propertyB] = [a.HeurePriseEnCharge, b.HeurePriseEnCharge]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
