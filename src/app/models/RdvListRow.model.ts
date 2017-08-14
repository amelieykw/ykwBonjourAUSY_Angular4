export class RdvListRow {
  constructor(
  	public rdvId: number,
    public rdvPrenom: string,
    public rdvNom: string,
    public contact: string,
    public HeurePrevu: string,
    public isValide: number,
    public HeurePriseEnCharge: string) {}
}
