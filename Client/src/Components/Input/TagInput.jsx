import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <section className="">
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-200 px-2 py-2 rounded-xl cursor-pointer">
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}>
                <MdClose className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          value={inputValue}
          type="text"
          className="text-sm bg-transparent border-2 px-3 py-2 rounded outline-none"
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-9 h-9 flex items-center justify-center rounded-md border-2 border-blue-700 hover:bg-blue-700"
          onClick={() => {
            addNewTag();
          }}>
          <MdAdd className="text-blue-700 hover:text-white" />
        </button>
      </div>
    </section>
  );
};

export default TagInput;
