// Middleware pour servir le favicon
const express = require('express');
const path = require('path');

const serveFavicon = (req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  }
  next();
};

module.exports = serveFavicon;
