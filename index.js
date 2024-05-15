const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    importtant: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    importtant: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    importtant: true,
  },
];

const requestLogger = (req, res, next) => {
    console.log('Mehod: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(requestLogger)

const unknownEndPoint = (req, res) => {
    res.status(400).send({
        error: "unknown end point"
    })
}


//add new resource
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content is missing",
    });
  }
  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false,
  };
  notes = notes.concat(note);
  res.json(note);
});

//fetching collection
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//fetching single resource
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(400).end();
  }
});

//deleting a resource
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((n) => n.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT ||  3001;

app.listen(PORT, () => {
  console.log(`Server started running at port ${PORT}`);
});
