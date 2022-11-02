"use strict";

var header = document.querySelector('#pageHeader');
window.addEventListener("scroll", function () {
  if (window.scrollY === 0) {
    header.style.setProperty('--bg-color', 'var(--light-color)');
  } else {
    header.style.removeProperty('--bg-color');
  }
});