import React from "react";
import { getInitials } from "../../Utils/helper";

const ProfileInfo = ({ onLogout }) => {
  return (
    <section className="flex items-center gap-2">
      <div className="w-12 h-12 flex items-center justify-center pt-1 rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer">
        {getInitials("John Wick")}
      </div>
      <div className="">
        <p className="text-sm font-medium">John Wick</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default ProfileInfo;
