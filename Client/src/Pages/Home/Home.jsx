import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NoteCard from "../../Components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [notes, setNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const name = { ...userInfo };

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get All Notes
  const getNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-notes");
      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error ocurred. Please try again.");
    }
  };

  useEffect(() => {
    getNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <main>
      <NavBar userInfo={name.fullName} />

      <section className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {notes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>

        <button
          className="w-16 h-16 flex items-center justify-center rounded-3xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}>
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
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto">
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
