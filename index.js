import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Rutas
app.get('/', (req, res) => {
    res.render('register'); //REGISTER O LOGIN
});

app.get('/register', (req, res) => {
    res.render('register');
});

// Ruta de registro falta por revisar
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    console.log("Nuevo usuario:", username, password);

    // Aquí deberías guardar en DB
    res.status(201).json({ message: "Usuario registrado con éxito" });
});

// Ruta de login (simulada)
app.post('/register', async(req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
   
   /* if (!username || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }
    */
    try{
        const id= await UserRepository.create({username, password});
        res.send({id})
    }catch(error){
        res.status(400).send(error.message);
    }
});

app.listen(PORT, () => console.log(`Servidor abierto en http://localhost:${PORT}`));
