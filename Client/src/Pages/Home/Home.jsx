import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NoteCard from "../../Components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  //Get User Info

  return (
    <main>
      <NavBar userInfo={userInfo}/>

      <section className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on 7th April"
            date="3rd Apr 2024"
            content="Meeting on 7th April"
            tags="#Meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>

        <button
          className="w-16 h-16 flex items-center justify-center rounded-3xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto"
        >
          <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
              setOpenAddEditModal({ isShown: false, type: "add", data: null });
            }}
          />
        </Modal>
      </section>
    </main>
  );
};

export default Home;
