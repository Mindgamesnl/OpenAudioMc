import React from 'react';
import PropTypes from 'prop-types';

export function BlackoutPage(props) {
  let style;
  let hasBackground = false;
  if (props.coverImage) {
    style = {
      backgroundImage: `url(${props.coverImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    };
    hasBackground = true;
  } else {
    style = {
      background: props.backgroundColor,
    };
  }

  return (
    <div
      className="flex flex-col xl:space-y-4 overflow-y-hidden animated fadeIn faster fixed  left-0 top-0 justify-center items-center inset-0 z-40 outline-none focus:outline-none"
      style={style}
    >
      {hasBackground ? (
        <>
          <div className="absolute h-screen w-screen top-0 backdrop-filter backdrop-blur-md inset-0 z-0" />
          <div className="absolute h-screen w-screen xl:-top-4 bg-black opacity-50 inset-0 z-20" />
          <div className={`z-30 overflow-y-auto ${props.additionalPageStyles}`}>
            {props.children}
          </div>
        </>
      ) : null}

      {!hasBackground && (
      <div
        className={` p-0 m-0 flex justify-center align-middle ${props.additionalPageStyles}`}
      >
        {props.children}
      </div>
      )}
    </div>
  );
}

BlackoutPage.propTypes = {
  coverImage: PropTypes.string,
  additionalPageStyles: PropTypes.string,
  backgroundColor: PropTypes.string,
};

BlackoutPage.defaultProps = {
  coverImage: null,
  additionalPageStyles: '',
  backgroundColor: '#211f1f',
};
