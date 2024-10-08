import React from 'react'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primaryLighter">
      <div className="text-center">
        <h1 className="text-9xl font-roboto text-dark relative">
          404
          <span className="absolute -top-20 w-full flex items-center justify-center">
            <span className="text-5xl text-gray-700">oops!</span>
          </span>
        </h1>
        <div className="not-found-text mt-10">
          <p className="text-4xl font-sans text-white">This page was not found</p>
          <p className="text-md mt-5 font-sans text-grayLight">You may have mistyped the address or this page may have moved</p>
        </div>
        <div className="Link-back-home mt-10">
        <a className="text-white font-roboto hover: underline text-lg cursor-not-allowed">
            Take me to Home page
          </a>
        </div>
      </div>
    </div>
  );
}
