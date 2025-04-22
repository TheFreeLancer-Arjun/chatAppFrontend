import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

export default function SideBar() {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();




 const {onlineUsers}= useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <div className="text-white p-4">Loading . . .</div>;

  return (
    <div>
      {users.map((user) => (
        <div
          key={user._id}
          className={`w-full h-20 flex items-center px-6 mb-2 rounded-lg cursor-pointer transition-all duration-200 
            ${selectedUser?._id === user._id ? "bg-green-800" : "bg-green-950 hover:bg-green-900"}`}
          onClick={() => setSelectedUser(user)}
        >
          <div className="h-12 w-12 bg-white rounded-full flex justify-center items-center text-black font-bold text-sm overflow-hidden">
            {user.profilePic ? (
              <img src={user.profilePic} alt="User" className="h-full w-full rounded-full object-cover" />
            ) : (
              <span>{user.fullName?.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <div className="text-white ml-6">
            <h1 className="text-lg font-semibold">{user.fullName}</h1>
            <p className="text-sm text-gray-400">    {onlineUsers.includes(user._id) ? "Online" : "Offline"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
