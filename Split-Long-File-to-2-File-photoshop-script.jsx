// Tested on Photoshop cs2 to Photoshop cc 2022
/**
* @@@BUILDINFO@@@ Split-Long-File-to-2-File-photoshop-script.jsx 1.0.0 Fri Aug 05 2022 19:57:33 GMT+0530
*/
/*
<javascriptresource>
<about>$$$/JavaScripts/SplitLongFileto2File/About=Abdul's Split-Long-File-to-2-File-photoshop-script.^r^rCopyright 2022 Abdul Karim mia.^r^rScript utility for Crop.^rNOTE:split Your Long Image File into 2 separate file!</about>
<category>Abdul's Scripts</category>
</javascriptresource>

Split-Long-File-to-2-File-photoshop-script
This will  split Your Long Image File into 2 separate file and save as png
  Date: 29/06/2022
  Author: Abdul karim mia
  Mail: akmia51@gmail.com
  Based on script by Abdul karim mia (http://www.abdulkarimmia.com/)
  Release notes:
  0.1 Initial version
  1.0.0 {
    added JPG, PDF, and PSD save options
    added Horizontally and Vertically crop options
    added progress bar
  }
  Donate (optional):
  If you find this script helpful, you can buy me a coffee
  - via PayPal https://paypal.me/akmia51
  NOTICE:
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale
  Released under the GNU license
    https://opensource.org/licenses/gpl-license
  Check other author's scripts: https://github.com/abdul-karim-mia
*/

#target photoshop
var cancelw = false;
var savPNG = false; // true for save Png file false for dont save
var savJPG = false; // true for save jpg file false for dont save
var savPDF = true; // true for save pdf file false for dont save
var savPSD = false; // true for save psd file false for dont save
var saveInSameFoldedr = true; // true for save in same Folder With Output SubFolder false for select Output folder
var cropHorizontaly = false; // true for crop Horizontally false for crop Vertically
var imgF = Folder.selectDialog("Select Input Folder");
if (imgF) {
  var img = imgF.getFiles(/\.(nef|cr2|crw|dcs|raf|arw|orf|dng|jpg|jpe|jpeg|tif|tiff|psd|eps|png|bmp)$/i);
  var sav;
  if (img.length) {
    if (saveInSameFoldedr) { sav = Folder(imgF + '/Outputs'); if (!sav.exists) sav.create(); } else { sav = Folder.selectDialog('Select Output Folder'); }
    if (sav) {
      var progresByAbdul = new Window("palette");
      progresByAbdul.text = "Progress Croping";
      progresByAbdul.orientation = "row";
      progresByAbdul.alignChildren = ["center", "center"];
      progresByAbdul.spacing = 10;
      progresByAbdul.margins = 16;

      var prro = progresByAbdul.add("progressbar", undefined, undefined, { name: "prro" });
      prro.maxvalue = img.length * 2;
      prro.value = 0;
      prro.preferredSize.width = 400;
      prro.preferredSize.height = 10;
      progresByAbdul.center();
      progresByAbdul.show();
      for (i = 0; i < img.length; i++) {

        if (open(img[i])) {
          var doc = activeDocument;
          var docNm = doc.name.split('.').slice(0, -1).join('.');
          var oldHis = doc.activeHistoryState;
          var docW = doc.width.as("in");
          var docH = doc.height.as("in");
          // bounds = array[left, top, right, bottom]
          if (cropHorizontaly) { doc.crop([UnitValue(0, 'in'), UnitValue(0, 'in'), UnitValue(docW / 2, 'in'), UnitValue(docH, 'in')], false, UnitValue(docW / 2, 'in'), UnitValue(docH, 'in')); } else {
            doc.crop([UnitValue(0, 'in'), UnitValue(0, 'in'), UnitValue(docW, 'in'), UnitValue(docH / 2, 'in')], false, UnitValue(docW, 'in'), UnitValue(docH / 2, 'in'));
          }
          if (savPNG) doc.saveAs(new File(sav + '/' + docNm + '_1.png'), new PNGSaveOptions(), true);
          if (savJPG) doc.saveAs(new File(sav + '/' + docNm + '_1.png'), new JPEGSaveOptions(), true);
          if (savPDF) doc.saveAs(new File(sav + '/' + docNm + '_1.png'), new PDFSaveOptions(), true);
          if (savPSD) doc.saveAs(new File(sav + '/' + docNm + '_1.png'), new PhotoshopSaveOptions(), true);
          prro.value++;
          doc.activeHistoryState = oldHis;
          if (cropHorizontaly) { doc.crop([UnitValue(docW / 2, 'in'), UnitValue(0, 'in'), UnitValue(docW, 'in'), UnitValue(docH, 'in')], false, UnitValue(docW / 2, 'in'), UnitValue(docH, 'in')); } else {
            doc.crop([UnitValue(0, 'in'), UnitValue(docH / 2, 'in'), UnitValue(docW, 'in'), UnitValue(docH, 'in')], false, UnitValue(docW, 'in'), UnitValue(docH / 2, 'in'));
          }
          if (savPNG) doc.saveAs(new File(sav + '/' + docNm + '_2.png'), new PNGSaveOptions(), true);
          if (savJPG) doc.saveAs(new File(sav + '/' + docNm + '_2.png'), new JPEGSaveOptions(), true);
          if (savPDF) doc.saveAs(new File(sav + '/' + docNm + '_2.png'), new PDFSaveOptions(), true);
          if (savPSD) doc.saveAs(new File(sav + '/' + docNm + '_2.png'), new PhotoshopSaveOptions(), true);
          doc.close(SaveOptions.DONOTSAVECHANGES);
          prro.value++;
        }
      }
    }
  } else { alert('No Image Found In Folder:-\n' + decodeURI(imgF)) }
}
