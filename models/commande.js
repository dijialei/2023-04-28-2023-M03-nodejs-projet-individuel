import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const commandeSchema = new Schema({

    livreur: String,
    client: { nom: String, prenom: String, _id: String },
    pizzas: [{ libelle: String, quantites: Number ,version: String, _id : String}],
    statut: String,
    adresse: String,
    total: Number


});
const Commande = mongoose.model('Commande', commandeSchema);
export default Commande;