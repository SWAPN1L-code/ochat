import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoClose } from "../assets/";
import { useEffect, useState } from "react";

export default function MyModal({ openView, setOpenView, imageUrl }) {
  function close() {
    setOpenView(false);
  }

  useEffect(() => {}, [imageUrl]);

  return (
    <>
      <Dialog
        open={openView}
        as="div"
        className="z-40 focus:outline-none"
        onClose={close}
      >
        <div
          onClick={close}
          className="fixed inset-0 flex items-center justify-center z-10 w-screen h-full overflow-y-auto bg-black bg-opacity-90 backdrop-blur-sm"
        >
          <div className="relative max-w-7xl mx-4">
            <img
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              src={imageUrl}
              alt="Preview"
            />
            <button
              className="absolute bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full z-50 -top-4 -right-4 p-2 text-2xl text-gray-700 dark:text-gray-300 cursor-pointer transition-colors shadow-lg border border-gray-200 dark:border-gray-600"
              onClick={close}
              aria-label="Close"
            >
              <IoClose />
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
