import React from 'react';

const Copyright = () => {

  const isMobile = window.innerWidth < 767;

  return (
    <div id="footer">
        &copy; <a href="https://github.com/ccarmivalarao" target="_blank">ccarmivalarao</a>
    </div>
  );
};

export default Copyright;
