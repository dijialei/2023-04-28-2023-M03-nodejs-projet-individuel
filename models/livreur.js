import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const livreurSchema = new Schema({
    nom: String,
    prenom: String,
    tel: String,
});
const Livreur = mongoose.model('Livreur', livreurSchema);
export default Livreur;