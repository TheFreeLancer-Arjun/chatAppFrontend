import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useAuthStore } from "../store/useAuthStore";


export default function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef  = useRef(null)

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);

      subscribeToMessages();
      return()=> unsubscribeFromMessages();
      
    }
  }, [getMessages, selectedUser?._id, subscribeToMessages, unsubscribeFromMessages]);


  useEffect(()=>{

    if(messageEndRef.current && messages  ){
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
    }   
  },[messages])

  if (!selectedUser) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Please select a user to start chat.
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message._id}
            ref={messageEndRef}
            className={`flex items-end gap-2 ${
              message.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
              {message.senderId === authUser._id ? (
                authUser.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center h-full w-full text-black font-bold">
                    {authUser.fullName?.charAt(0).toUpperCase()}
                  </div>
                )
              ) : selectedUser.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex justify-center items-center h-full w-full text-black font-bold">
                  {selectedUser.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Message bubble */}
            <div
              className={`p-2 px-4 rounded-xl max-w-xs ${
                message.senderId === authUser._id
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}
