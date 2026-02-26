import express from "express";

const app = express();
const PORTA = 3000;

app.use(express.json());

// Dados em memória
const tarefas = [
  { id: 1, titulo: "Estudar Node", concluida: false },
  { id: 2, titulo: "Fazer telas no Figma", concluida: true }
];

// Rota GET /tarefas - lista todas as tarefas
app.get("/tarefas", (req, res) => {
  return res.status(200).json(tarefas);
});

// Rota POST /tarefas - cria uma nova tarefa com validação mínima
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório." });
  }

  const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1;
  const novaTarefa = {
    id: novoId,
    titulo: titulo.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);

  return res.status(201).json(novaTarefa);
});

// Iniciar servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
