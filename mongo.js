const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password as an argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://manojkumar2002july:${password}@noteapp.jnuwqwo.mongodb.net/noteApp?retryWrites=true&w=majority&appName=NoteApp`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Callback-functions suck",
  important: true,
});

note.save().then((result) => {
  console.log("Note is saved");
  mongoose.connection.close();
});

