import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const NavBar = ({ userInfo }) => {
  console.log(userInfo);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {};
  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section
      className={`bg-white flex items-center px-6 py-2 drop-shadow ${
        userInfo && Object.keys(userInfo).length > 0
          ? "justify-between"
          : "justify-center"
      }`}>
      <h2 className="font-Matemasie text-xl font-medium text-black py-2">
        ...TODO TASK...
      </h2>
      {userInfo && Object.keys(userInfo).length > 0 && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}
      {userInfo && Object.keys(userInfo).length > 0 && (
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      )}
    </section>
  );
};

export default NavBar;
