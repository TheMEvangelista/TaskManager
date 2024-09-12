import moment from "moment";
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
    <section className="shadow rounded-lg p-4 bg-gray-200 hover:shadow-xl transition-all ease-in-out">

      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{moment(date).format("DD MMM YYYY")}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-button ${
            isPinned ? "text-primary" : "text-slate-500"
          }`} onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags.map((item)=>`#${item}`)}</div>
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
