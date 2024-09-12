import React, { useState } from "react";
import TagInput from "../../Components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../Utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  getNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  //Add notes
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage(response.data.message);
        getNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };
  //Edit note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage(response.data.message);
        getNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter a content");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <main className="relative ">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-slate-50 hover:bg-slate-200"
        onClick={onClose}>
        <MdClose className="text-xl text-slate-500" />
      </button>

      <section className="flex flex-col gap-2 mt-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Task title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </section>
      <section className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-gray-200 p-2 rounded-md"
          placeholder="Task content..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </section>

      <section className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </section>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="primary-button font-medium mt-5 p-3 rounded-lg"
        onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </main>
  );
};

export default AddEditNotes;
