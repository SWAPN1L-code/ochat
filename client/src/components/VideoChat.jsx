import React, { useState } from "react";
import {
  FaVideoSlash,
  BsMicMuteFill,
  FaMicrophone,
  FaVideo,
  MdCallEnd,
  MdFlipCameraAndroid,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
} from "../assets";
import { useConnectWebRtc } from "../context/WebRtcContext";

export default function VideoChat({ show }) {
  const {
    localVideoRef,
    remoteVideoRef,
    handleHangup,
    callConnectionState,
    handleToggleCamera,
    handleToggleMicrophone,
    isCameraActive,
    isMicrophoneActive,
    flipCamera,
    inputVideoDevices,
    selectedInputVideoDevice,
    changeVideoInputDevice,
    inputAudioDevices,
    selectedInputAudioDevice,
    changeAudioInputDevice,
  } = useConnectWebRtc();

  const handleChangeVideoInput = (deviceId) => {
    changeVideoInputDevice(deviceId);
  };

  const handleChangeAudioInput = (deviceId) => {
    changeAudioInputDevice(deviceId);
  };

  const [showVideoOptionTray, setShowVideoOptionTray] = useState(false);
  const [showAudioOptionTray, setShowAudioOptionTray] = useState(false);
  const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;

  return (
    <div
      className={`absolute ${
        show ? "" : "hidden"
      } z-50 bg-gray-900 w-full h-full bg-opacity-90 p-20 md:p-0`}
    >
      <div className="relative bg-gray-950 w-full h-full rounded-xl shadow-2xl">
        <video
          ref={remoteVideoRef}
          autoPlay
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        ></video>
        <video
          ref={localVideoRef}
          autoPlay
          className="absolute bottom-4 left-4 md:left-3 md:bottom-4 w-48 h-36 md:w-16 md:h-24 object-cover border-2 md:border-[1px] border-white rounded-lg shadow-lg"
        ></video>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-full backdrop-blur-sm">
          <div className="relative flex items-center bg-gray-700 bg-opacity-80 rounded-full">
            <div
              className={`${
                showAudioOptionTray && !isMobileDevice ? "" : "hidden"
              } videoDevices absolute bottom-10`}
            >
              {inputAudioDevices?.length !== 0 && (
                <ul className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                  {inputAudioDevices?.map((device) => (
                    <li
                      key={device.deviceId}
                      onClick={() => handleChangeAudioInput(device.deviceId)}
                      className={`text-xs w-[250px] text-left cursor-pointer my-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        device.deviceId === selectedInputAudioDevice
                          ? "text-primary font-semibold bg-gray-100 dark:bg-gray-700"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {device.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div
              onClick={() => setShowAudioOptionTray(!showAudioOptionTray)}
              className={`${
                isMobileDevice && "hidden"
              } px-1 text-2xl text-white cursor-pointer`}
            >
              {showAudioOptionTray ? (
                <RiArrowDropUpLine />
              ) : (
                <RiArrowDropDownLine />
              )}
            </div>
            <button
              onClick={handleToggleMicrophone}
              className="p-3 bg-white bg-opacity-30 rounded-full text-white hover:bg-opacity-40 transition-all"
            >
              {isMicrophoneActive ? <FaMicrophone /> : <BsMicMuteFill />}
            </button>
          </div>
          <div className="relative flex items-center bg-gray-700 bg-opacity-80 rounded-full">
            <div
              className={`${
                showVideoOptionTray && !isMobileDevice ? "" : "hidden"
              } videoDevices absolute bottom-10`}
            >
              {inputVideoDevices?.length !== 0 && (
                <ul className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                  {inputVideoDevices?.map((device) => (
                    <li
                      key={device.deviceId}
                      onClick={() => handleChangeVideoInput(device.deviceId)}
                      className={`text-xs w-[250px] text-left cursor-pointer my-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        device.deviceId === selectedInputVideoDevice
                          ? "text-primary font-semibold bg-gray-100 dark:bg-gray-700"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {device.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div
              onClick={() => setShowVideoOptionTray(!showVideoOptionTray)}
              className={`${
                isMobileDevice && "hidden"
              } px-1 text-2xl text-white cursor-pointer`}
            >
              {showVideoOptionTray ? (
                <RiArrowDropUpLine />
              ) : (
                <RiArrowDropDownLine />
              )}
            </div>
            <button
              onClick={handleToggleCamera}
              className="p-3 bg-white bg-opacity-30 rounded-full text-white hover:bg-opacity-40 transition-all"
            >
              {isCameraActive ? <FaVideo /> : <FaVideoSlash />}
            </button>
          </div>
          <button
            onClick={flipCamera}
            className="p-3 bg-white bg-opacity-30 rounded-full text-white hover:bg-opacity-40 transition-all"
          >
            <MdFlipCameraAndroid />
          </button>
          <button
            onClick={handleHangup}
            className="p-3 bg-red-500 bg-opacity-90 rounded-full text-white hover:bg-red-600 transition-all"
          >
            <MdCallEnd />
          </button>
        </div>

        <div className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2">
          {callConnectionState !== "connected" && (
            <div className="text-white text-lg font-medium bg-gray-900 bg-opacity-70 px-6 py-3 rounded-lg backdrop-blur-sm">
              {callConnectionState}...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
