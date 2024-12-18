import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((e) => {
        alert(e);
      });
  };
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/${id}/`)
      .then((res) => {
        if (res.status == 204) console.log("Note deleted successfully");
        else alert("Failed to delete note");
        getNotes();
      })
      .catch((e) => {
        alert(e);
      });
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status == 201) console.log("Note created successfully");
        else alert("Failed to create note");

        getNotes();
      })
      .catch((e) => {
        console.error("Error creating note:", e.response || e);
        alert(e);
      });
  };
  return (
    <div>
      <h2>Tasks</h2>
      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} />
      ))}
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          type="text"
          value={content}
          id="content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default Home;
