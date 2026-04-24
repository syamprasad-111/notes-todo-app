import { useEffect, useState } from "react";
import API from "../api/axios";
import NoteCard from "../components/NoteCard";
import notesimg from "../assets/notesimg.jpeg";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState(null);
  const [saving, setSaving] = useState(false);

  // fetch notes
  const fetchNotes = async () => {
    try{
      const { data } = await API.get("/notes");
      setNotes(data);
    }
    catch(error){
      console.error(error);
      alert("Failed to load notes");
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  // create a note
  const createNote = async () => {
    if(!title.trim()) return;
    try{
      const {data} = await API.post("/notes", {title,content});
      setNotes((prev) => [data, ...prev]);
      setTitle("");
      setContent("");
    } 
    catch{
      alert("Failed to create note");
    }
  };

  // delete a note
  const deleteNote = async (id)=>{
    try{
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      setSelectedNote(null);
    } 
    catch{
      alert("Delete failed");
    }
  };

  // auto save changes/updates
  useEffect(()=>{
    if(!selectedNote) return;
    setSaving(true);
    const timeout = setTimeout(async () => {
      try {
        await API.put(`/notes/${selectedNote._id}`, {
          title: selectedNote.title,
          content: selectedNote.content,
        });
        setNotes((prev) =>
          prev.map((n) =>
            n._id === selectedNote._id ? selectedNote : n
          )
        );
      } 
      catch{
        console.log("Auto save failed");
      }
      setSaving(false);
    }, 700); // debounce delay
    return ()=>clearTimeout(timeout);
  },[selectedNote]);

  // close modal-no selected note
  const closeModal = () => {
    setSelectedNote(null);
  };

  //summarize button fuction
const summarizeNote = async (noteText)=>{
  try {
    const res = await API.post('/ai/summarize',{
      text: noteText
    });
    const data = res.data;
    alert("Summary: " + data.summary);
  } 
  catch (error){
    console.error("Error summarizing note:", error);
  }
};

  return(
    <div className="max-w-6xl mx-auto p-6">
      {/* <h2 className="text-2xl font-bold mb-4">
        Notes
      </h2>
      <img src={notesimg} alt="notes logo" className="w-10 h-10"/> */}
      <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold">
                  Notes
                </h2>
                <img src={notesimg} alt="notes Logo" className="w-8 h-8"/>
      </div>
      {/* create a note*/}
      <div className="bg-white shadow rounded p-4 mb-6">
        <input
          placeholder="Enter Note Title"
          className="border w-full p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Note Content"
          className="border w-full p-2 mb-2"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={createNote}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Note</button>
      </div>

      {/* notes grid/cards */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onClick={()=>setSelectedNote(note)}
          />
        ))}
      </div>

      {/* each note modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <input
              className="border w-full p-2 mb-2"
              value={selectedNote.title}
              onChange={(e) =>
                setSelectedNote((prev) => ({...prev,title: e.target.value}))
              }
            />
            <textarea
              className="border w-full p-2 mb-3"
              rows="6"
              value={selectedNote.content}
              onChange={(e) =>
                setSelectedNote((prev) => ({...prev,content: e.target.value}))
              }
            />

            {/* Auto save indicator */}
            <div className="flex justify-between">
              <button onClick={() => summarizeNote(selectedNote.content)}>
                Summarize with AI
              </button>
              <button
                onClick={() => deleteNote(selectedNote._id)}
                className="text-red-600">
                🗑 Delete</button>
              <button
                onClick={closeModal}
                className="text-gray-500">
                Close</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesPage;