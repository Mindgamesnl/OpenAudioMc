import React from 'react';

function ErrorPage({ code = 'UNKNOWN', title = 'Something went wrong', description = "The page you're looking for couldn't be found or an unexpected error has occurred." }) {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4 text-zinc-200">
      <div className="flex flex-col items-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-red-500 rounded-full flex items-center justify-center">
              <span className="text-5xl font-bold text-red-500">!</span>
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>

        <p className="text-zinc-400 mb-10 text-center max-w-md">
          {description}
        </p>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <p className="text-zinc-500 text-sm mb-2">
          Error Code:
          {code}
        </p>
        <div className="flex space-x-2">
          <div className="w-1 h-1 bg-zinc-700 rounded-full animate-pulse" />
          <div className="w-1 h-1 bg-zinc-700 rounded-full animate-pulse delay-100" />
          <div className="w-1 h-1 bg-zinc-700 rounded-full animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
