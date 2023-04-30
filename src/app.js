import express from 'express';
import mongoose from 'mongoose';
import Pizza from '../models/pizza.js';
import Livreur from '../models/livreur.js';

const mongoUrl = 'mongodb://127.0.0.1:27017/restaurant-pizza';
mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl);

const port = 5000;
const ip = '127.0.0.1';
const backEndUrl = `http://${ip}:${port}`;
const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//admin Menu

app.get('/admin', (req, res) => {
    res.render('index', {});
})

//admin Pizza

app.get('/admin/pizza', async (req, res) => {
    let result = await Pizza.find({});
    let length = result.length;
    res.render('pizzaAdmin', {
        showForm: false,
        length: length,
        arrayPizza: result
    });
})

app.get('/admin/pizza/showForm', (req, res) => {
    res.render('pizzaAdmin', {
        showForm: true,
        inputDisabled: "",
        item: {
            _id: "",
            code: "",
            libelle: "",
            ingredients: "",
            categorie: "",
            prix: "",
            version: ""
        }
    });
})

app.post('/admin/pizza/editer', async (req, res) => {
    const url = req.url;
    const requestUrl = new URL(url, backEndUrl);
    const id = requestUrl.searchParams.get('_id');
    let result = await Pizza.findById(id);
    res.render('pizzaAdmin', {
        showForm: true,
        inputDisabled: "readonly",
        item: result
    });
})

app.post('/admin/pizza/create', async (req, res) => {
    let result = await Pizza.create(req.body);
    result = await Pizza.find({});
    let length = result.length;
    res.render('pizzaAdmin', {
        showForm: false,
        length: length,
        arrayPizza: result
    });
})

app.post('/admin/pizza/delete', async (req, res) => {
    const url = req.url;
    const requestUrl = new URL(url, backEndUrl);
    const id = requestUrl.searchParams.get('_id');
    console.log(id);
    let result = await Pizza.deleteOne({ _id: id });
    result = await Pizza.find({});
    let length = result.length;
    res.render('pizzaAdmin', {
        showForm: false,
        length: length,
        arrayPizza: result
    });
})

//admin livreur

app.get('/admin/livreur', async (req, res) => {
    let result = await Livreur.find({});
    let length = result.length;
    res.render('livreur.ejs', {
        showForm: false,
        length: length,
        arrayLivreur: result

    });
})

app.get('/admin/livreur/showForm', async (req, res) => {
    res.render('livreur', {
        showForm: true,
        item: {
            nom: "",
            prenom: "",
            tel: ""
        },
        nameId: "",
        actionForm: '/admin/livreur/create'
    })
})

app.post('/admin/livreur/create', async (req, res) => {
    let result = await Livreur.create(req.body);
    result = await Livreur.find({});
    let length = result.length;
    res.render('livreur.ejs', {
        showForm: false,
        length: length,
        arrayLivreur: result

    });
})

app.post('/admin/livreur/editer', async (req, res) => {
    const url = req.url;
    const requestUrl = new URL(url, backEndUrl);
    const id = requestUrl.searchParams.get('_id');
    let result = await Livreur.findById(id);
    res.render('livreur', {
        showForm: true,
        item: result,
        nameId: 'name=_id',
        actionForm: '/admin/livreur/update'
    });
})

app.post('/admin/livreur/update', async (req, res) => {
    let result = await Livreur.findByIdAndUpdate(req.body._id, { nom: req.body.nom, prenom: req.body.prenom, tel: req.body.tel });
    result = await Livreur.find({});
    let length = result.length;
    res.render('livreur.ejs', {
        showForm: false,
        length: length,
        arrayLivreur: result
    });
})

app.post('/admin/livreur/delete', async (req, res) => {
    const url = req.url;
    const requestUrl = new URL(url, backEndUrl);
    const id = requestUrl.searchParams.get('_id');
    let result = await Livreur.findByIdAndDelete(id);
    result = await Livreur.find({});
    let length = result.length;
    res.render('livreur.ejs', {
        showForm: false,
        length: length,
        arrayLivreur: result
    });

})




app.listen(port, ip, () => {
    console.log(`Server is listenning at ${backEndUrl}`);
});