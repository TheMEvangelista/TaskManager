import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NoteCard from "../../Components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import Toast from "../../Components/ToastMessage/Toast";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [toastMessage, setToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [notes, setNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo);

  const navigate = useNavigate();

  const showToastMessage = (message, type) => {
    setToastMessage({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setToastMessage({
      isShown: false,
      message: "",
    });
  };

  const handleEditNotes = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        console.log(response.data.user)
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        localStorage.removeItem("userToken");
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
      console.log(error)
    }
  };

  //Delete notes
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage(response.data.message, "delete");
        getNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error ocurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    getNotes();
    getUserInfo();
  }, []);

  return (
    <main>
      <NavBar userInfo={userInfo} />

      <section className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {notes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEditNotes(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => {}}
            />
          ))}
        </div>

        <button
          className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
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
            getNotes={getNotes}
            showToastMessage={showToastMessage}
          />
        </Modal>
        <Toast
          isShown={toastMessage.isShown}
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={handleCloseToast}
        />
      </section>
    </main>
  );
};

export default Home;
