import React from 'react';
import { msg } from '../../client/OpenAudioAppContainer';

export function Header() {
  return (
    <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-10">
      <div className="text-center lg:text-left space-y-3">
        <h3 className="text-xl font-bold tracking-tight text-white">
          {msg('home.welcome')}
        </h3>
        <p
          className="text-base text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: msg('home.header') }}
        />
      </div>
    </div>
  );
}
