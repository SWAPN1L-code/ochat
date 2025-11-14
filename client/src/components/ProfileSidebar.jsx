import { useState, useRef } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "../assets";
import { FiImage } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { updateProfilePicture } from "../api";
import { requestHandler } from "../utils";

export default function ProfileSidebar() {
  const { user, logout, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const colapseFieldValues = [
    {
      title: "Name",
      value: user.username,
    },
    {
      title: "Email",
      value: user.email,
    },
  ];

  const [isColapsed, setIsColapsed] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      setTimeout(() => setUploadError(null), 3000);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      setTimeout(() => setUploadError(null), 3000);
      return;
    }

    await requestHandler(
      () => updateProfilePicture(file),
      setUploading,
      (res) => {
        const { data } = res;
        updateUser(data.user);
        setUploadError(null);
      },
      (error) => {
        setUploadError(error || "Failed to upload profile picture");
        setTimeout(() => setUploadError(null), 3000);
      }
    );
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-[380px] md:w-screen h-full">
      {/* WhatsApp Style Header */}
      <div className="bg-whatsapp_teal dark:bg-backgroundDark2 px-4 py-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-medium text-lg">
            Profile
          </h1>
          <button
            onClick={logout}
            className="text-white hover:bg-white/10 cursor-pointer text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-3">
          <div className="relative group">
            <img
              className="size-32 rounded-full object-cover ring-4 ring-white/20"
              src={user.avatarUrl}
              alt={user.username}
            />
            {/* Camera overlay */}
            <div
              onClick={handleCameraClick}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              {uploading ? (
                <div className="text-white text-xs">Uploading...</div>
              ) : (
                <FiImage className="text-white text-2xl" />
              )}
            </div>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          {uploadError && (
            <p className="text-red-300 text-xs text-center max-w-[200px]">
              {uploadError}
            </p>
          )}
          <p className="text-white font-medium text-xl">
            {user.username}
          </p>
        </div>
      </div>

      <div className="bg-backgroundLight1 dark:bg-backgroundDark2 px-4 py-4">
        <p className="text-sm text-text_light_secondary dark:text-text_dark_secondary mb-2">
          About
        </p>
        <p className="text-text_light_primary dark:text-text_dark_primary text-sm">
          {user.bio || "Hey there! I am using OChat"}
        </p>
      </div>

      <div className="bg-backgroundLight2 dark:bg-backgroundDark3 px-4 py-4 mt-2">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsColapsed(!isColapsed)}
        >
          <div className="text-sm font-medium text-text_light_primary dark:text-text_dark_primary">
            Account Details
          </div>
          <div className="text-xl text-text_light_secondary dark:text-text_dark_secondary">
            {isColapsed ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </div>
        </div>
        <div
          className={`mt-3 ${
            isColapsed ? "block" : "hidden"
          }`}
        >
          {colapseFieldValues.map(({ title, value }, index) => (
            <div key={index} className="mb-4 last:mb-0 bg-backgroundLight1 dark:bg-backgroundDark2 p-3 rounded-lg">
              <p className="text-xs text-text_light_secondary dark:text-text_dark_secondary mb-1">{title}</p>
              <h5 className="text-sm font-medium text-text_light_primary dark:text-text_dark_primary">{value}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
