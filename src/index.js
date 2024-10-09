const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// Conexão com MongoDB
mongoose
  .connect("mongodb://localhost:27017/Film") // Certifique-se de que este é o seu banco de dados correto
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Definição do modelo Film
const Film = mongoose.model("Film", {
  title: String,
  description: String,
});

// Definição do modelo Director
const Director = mongoose.model("Director", {
  name: String,
  age: Number,
  films: [
    {
      title_en: String,
      title_pt: String,
    },
  ],
}, "Diretores"); // Especificando o nome da coleção


// Rota GET para buscar diretores pelo nome
app.get("/directors", async (req, res) => {
  const { name } = req.query;

  console.log("Buscando diretor:", name); // Log do nome buscado

  if (!name) {
    return res.status(400).send({ message: "Nome do diretor é obrigatório" });
  }

  try {
    // Buscar todos os diretores para verificação
    const allDirectors = await Director.find(); 
    console.log("Todos os diretores:", allDirectors); // Veja todos os diretores

    // Usando find com regex
    const directors = await Director.find({ name: { $regex: name, $options: "i" } });

    console.log("Diretores encontrados:", directors); // Veja o que foi encontrado

    if (directors.length === 0) {
      return res.status(404).send({ message: "Diretor não encontrado" });
    }

    res.send(directors);
  } catch (error) {
    console.error("Erro ao buscar diretores:", error); // Log de erro
    res.status(500).send({ message: "Erro ao buscar diretores", error });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log("App funcionando na porta", port);
});
