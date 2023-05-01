import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const commandeSchema = new Schema({

    livreur: String,
    client: { nom: String, prenom: String, _id: String },
    pizzas: [{ nom: String, quantites: Number }],
    statut: String,
    adresse: String,
    total: Number


});
const Commande = mongoose.model('Commande', commandeSchema);
export default Commande;