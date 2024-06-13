import React from 'react';
import { msg } from '../../client/OpenAudioAppContainer';

export function HamburgerSvg() {
  // remix of https://www.svgrepo.com/svg/532195/menu?edit=true
  // by: SVG Repo
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-tooltip-id="hamburger-tooltip"
      data-tooltip-content={msg('navbar.menu')}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M4 6H20M4 12H20M4 18H20"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
