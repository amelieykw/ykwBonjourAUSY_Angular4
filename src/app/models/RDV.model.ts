export class RDV {
  constructor(
    public civilite: string,
    public prenom_candidate: string,
    public nom_candidate: string,
    public ContactId: number,
    public hour: number,
    public minute: number) {}
}
