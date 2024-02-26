import React from 'react';
import { msg } from '../../client/OpenAudioAppContainer';

export function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex overflow-hidden w-3/4 pt-4">
          <div className="relative z-10 lg:w-full">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left">
                <h3 className="font-extrabold tracking-tighter pb-1 text-lg">
                  {msg('home.welcome')}
                </h3>
                <p
                  className="mb-6 text-base md:text-sm"
                  dangerouslySetInnerHTML={{ __html: msg('home.header') }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
