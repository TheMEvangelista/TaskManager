import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <section className="border rounded p-4 bg-gray-200 hover:shadow-xl transition-all ease-in-out">

      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-button ${
            isPinned ? "text-primary" : "text-slate-500"
          }`}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags}</div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-button text-slate-500 hover:text-green-500"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-button text-slate-500 hover:text-red-700"
            onClick={onDelete}
          />
        </div>
      </div>
    </section>
  );
};

export default NoteCard;
