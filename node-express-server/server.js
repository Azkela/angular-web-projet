const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connexion avec la base MongoDB réussie !");
  })
  .catch(err => {
    console.log("Connexion impossible avec la base MongoDB !", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur TaskMate !" });
});

require("./app/routes/task.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Le serveur est sur le port : ${PORT}.`);
});
