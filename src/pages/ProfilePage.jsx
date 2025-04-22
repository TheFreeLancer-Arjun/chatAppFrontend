import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
   const [selectedImg,setSelectedImg]=useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image)

      // Update profile with the new image
      await updateProfile({ profilePic: base64Image });

      // Log to check if the update is successful
      console.log("Updated profile pic:", authUser?.profilePic);
    };
  };

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-[10cm] w-[8cm] flex flex-row justify-center items-center'>
        <div className='h-[4cm] w-[4cm] rounded-full bg-amber-400'>
          <img
            src={selectedImg || authUser?.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s'}
            alt="Profile"
            className='h-full w-full rounded-full'
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
          />
        </div>

        <div>
          <h1 className='text-2xl font-bold text-center'>{authUser?.fullName}</h1>
          <h1 className='text-xl font-bold text-center'>{authUser?.email}</h1>
        </div>
      </div>
    </div>
  );
}
