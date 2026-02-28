import React from "react";

function NoteCard({ note, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        bg-white
        rounded-lg
        shadow
        p-4
        cursor-pointer
        hover:shadow-lg
        transition
        border"
    >
      {/* title */}
      <h3 className="font-bold text-lg mb-2 break-words">
        {note.title || "Untitled"}
      </h3>
      {/* note content preview */}
      <p className="text-gray-600 line-clamp-4 break-words">
        {note.content || "No content"}
      </p>
    </div>
  );
}

export default NoteCard;