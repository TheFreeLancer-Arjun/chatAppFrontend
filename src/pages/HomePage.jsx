import React from "react";
import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

export default function () {
  const { selectedUser } = useChatStore();
  return (
    <div className="w-[100%]  h-screen bg-black text-white flex  ">
      <div className="w-[30%] bg-green-300 text-black">
     <SideBar/>



     

       

        
      </div>
      <div className="w-[80%] bg-black text-white">

      {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
      </div>
    </div>
  );
}
