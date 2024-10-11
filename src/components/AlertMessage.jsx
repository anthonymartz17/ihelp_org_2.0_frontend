import React from "react";

export default function AlertModal({ title, message, onClose }) {
  return (
    <div className=" bg-dark/80 fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-dark">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-white ">{message}</p>
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              className="text-white bg-primary hover:bg-primaryLighter focus:ring-4 focus:outline-none focus:ring-grayDark font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primaryLighter dark:focus:ring-dark"
            >
              I accept
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-dark focus:outline-none bg-white rounded-lg border border-grayDark hover:bg-grayLight hover:text-primary focus:z-10 focus:ring-4 focus:ring-grayLight dark:focus:ring-dark dark:bg-dark dark:text-grayDark dark:border-grayDark dark:hover:text-white dark:hover:bg-secondaryLighter"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
