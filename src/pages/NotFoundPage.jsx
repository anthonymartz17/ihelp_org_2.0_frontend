import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primaryLighter">
      <div className="text-center">
        <div className="flex justify-center">
          <img
            src="src/assets/graphics/404 not found.png"
            alt="Not Found Page"
            className="w-3/4 lg:w-3/4"
          />
        </div>
        <div className="not-found-text">
          <p className="text-4xl font-sans text-white font-bold">
            This page was not found
          </p>
          <p className="text-md mt-5  font-sans text-grayLight">
            You may have mistyped the address or this page may have moved
          </p>
        </div>
        <div className="Link-back-home mt-5">
          <a className="text-white font-roboto font-bold hover: underline text-lg cursor-pointer">
            Take me to Home page
          </a>
        </div>
      </div>
    </div>
  );
}
