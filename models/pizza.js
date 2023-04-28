import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const pizzaSchema = new Schema({
    code: String,
    libelle: String,
    ingredients: String,
    categorie: String,
    prix: Number,
    version: String,


});
const Pizza = mongoose.model('Pizza', pizzaSchema);
export default Pizza;