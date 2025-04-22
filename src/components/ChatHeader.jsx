import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { FaArrowLeft } from "react-icons/fa"; // Optional back button for mobile

export default function ChatHeader() {
  const { selectedUser,setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="w-full h-16 bg-green-900 flex items-center px-4 shadow-md">
      {/* Optional: back button for mobile */}
      <div className="text-white mr-4 ">
        <FaArrowLeft onClick={()=>setSelectedUser(null)} />
      </div>

      <div className="h-10 w-10 bg-white rounded-full overflow-hidden">
        {selectedUser.profilePic ? (
          <img
            src={selectedUser.profilePic}
            alt="User"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center h-full text-black font-bold">
            {selectedUser.fullName?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="ml-4 text-white">
        <h1 className="text-lg font-semibold">{selectedUser.fullName}</h1>
        <p className="text-sm text-gray-300">
          {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}
