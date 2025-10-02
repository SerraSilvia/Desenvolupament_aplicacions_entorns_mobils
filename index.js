import express from "express";
import {PORT, SECRET_JWT_KEY} from './config.js';
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(express.static("public")); //diem que no ens processi aquesta carpeta

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, () => console.log(`servidor obert al port ${PORT}`));

//inici d'endpoints

app.get('/', (req, res) => {
res.render('login',user);
});