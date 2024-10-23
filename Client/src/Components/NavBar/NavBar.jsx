import { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const NavBar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const isUserLoggedIn = userInfo && Object.keys(userInfo).length > 0;

  const onLogout = () => {
    // Clear specific user-related data instead of all localStorage
    localStorage.removeItem('userToken'); // Example key
    navigate("/login");
  };

  const handleSearch = () => {
    // Implement search functionality here
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section
      className={`bg-white flex items-center px-6 py-2 drop-shadow ${
        isUserLoggedIn ? "justify-between" : "justify-center"
      }`}>
      <h2 className="font-Matemasie text-xl font-medium text-black py-2">
        ...TODO TASK...
      </h2>
      {isUserLoggedIn && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </>
      )}
    </section>
  );
};

export default NavBar;