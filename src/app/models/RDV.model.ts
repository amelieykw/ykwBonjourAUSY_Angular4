export class RDV {
  constructor(
    public civilite: string,
    public prenom_candidate: string,
    public nom_candidate: string,
    public nom_recruiteur: string,
    public hour: number,
    public minute: number) {}
}
