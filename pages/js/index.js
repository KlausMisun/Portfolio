"use strict";

var header = document.querySelector('header');
window.addEventListener("scroll", function () {
  if (window.scrollY === 0) {
    header.style.setProperty('--bg-color', 'var(--light-color)');
  } else {
    header.style.removeProperty('--bg-color');
  }
});