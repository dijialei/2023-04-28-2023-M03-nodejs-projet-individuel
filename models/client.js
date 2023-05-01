import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const clientSchema = new Schema({
    
    nom: String,
    prenom: String,
    adresses: Array,
    email: String,
    password: String,


});
const Client = mongoose.model('Client', clientSchema);
export default Client;