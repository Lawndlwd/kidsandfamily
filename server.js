const app = require("express");
const express = require("express");

app.use(express.static('./dist/kids-and-family-app'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/kids-and-family-app/'}
);
});
app.listen(process.env.PORT || 8080);
