import React from 'react';
import { msg } from '../../client/OpenAudioAppContainer';

export function Header() {
  return (
    <div>
      <div className="relative">
        <div
          className="px-4 py-4 mx-auto md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
        >
          <div className="relative sm:mx-auto w-full sm:text-center">
            <h2 className="mb-6 font-extrabold tracking-tighter pb-4 text-5xl text-white sm:text-4xl sm:leading-none">
              {msg('home.welcome')}
            </h2>
            <p
              className="mb-6 text-base text-indigo-100 md:text-lg"
              dangerouslySetInnerHTML={{ __html: msg('home.header') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
