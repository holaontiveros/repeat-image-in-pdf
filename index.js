const hummus = require('hummus');

/*
*  Editable settings
*/
// secure margins and separations
const borderMargin = 55;
const separation = 10;

// page size (letter)
const pageS = {
  height: 792,
  width: 612,
};

// image params
const image = {
  url: __dirname + '/torepeat.png',
  width: 75,
  height: 29,
};

/*
*  Non editable settings
*/
let fitsRow = true;
let posX = borderMargin;
let posY = borderMargin;

// hummus base settings
const pdfWriter = hummus.createWriter(__dirname + '/repeated-image_.${Date.now()}.pdf', {
  version: hummus.ePDFVersion14,
});
const page = pdfWriter.createPage();
var cxt = pdfWriter.startPageContentContext(page);

page.mediaBox = [0, 0, pageS.width, pageS.height];

while (fitsRow) {
  cxt.drawImage(posX, posY, image.url, {
    transformation: { width: image.width, height: image.height, proportional: true },
  });

  posX += image.width + separation;
  console.log(posX, posY);
  if (posX > pageS.width - borderMargin * 2) {
    posX = borderMargin;
    posY += image.height + separation;
  }
  if (posY > pageS.height - borderMargin) fitsRow = false;
}

pdfWriter.writePage(page);
pdfWriter.end();
