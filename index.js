import express from "express";
import { PORT } from "./config.js";
import { UserRepository } from "./user-repository.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views");

// Rutas
app.get("/", (req, res) => {
  res.render("login"); //LOGIN
});

app.get("/login", (req, res) => {
  res.render("login"); //LOGIN
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/protected", (req, res) => {
  const { username } = req.query;

  if (!username) {
    res.status(400).send("Falta el nombre de usuario");
    res.render("login");
  }

  res.render("protected", { username });
});

// Ruta de registro falta por revisar
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    /* Debemos comprobar que el usuario exista */
    const user = await UserRepository.login({ username, password });

    res.status(201).json({ message: "Usuario logeado con éxito", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta de login (simulada)
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const user = await UserRepository.create({ username, password });
    res.status(201).json({ message: "Usuario logeado con éxito", user });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(PORT, () =>
  console.log(`Servidor abierto en http://localhost:${PORT}`)
);
