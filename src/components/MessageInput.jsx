import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { FaPaperclip, FaPaperPlane, FaTimes } from "react-icons/fa";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      removeImage();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-4 border-t border-gray-600 bg-green-950">
      {imagePreview && (
        <div className="relative inline-block mb-2">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-80"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-white hover:text-green-400"
          title="Attach Image"
        >
          <FaPaperclip />
        </button>

        <button
          type="submit"
          className="text-white hover:text-green-400 disabled:text-gray-500"
          disabled={!text.trim() && !imagePreview}
          title="Send Message"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
