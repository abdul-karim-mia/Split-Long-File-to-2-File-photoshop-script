/*
Split-Long-File-to-2-File-photoshop-script
This will  split Your Long Image File into 2 separate file and save as png
  Date: 29/06/2022
  Author: Abdul karim mia
  Mail: akmia51@gmail.com
  Based on script by Abdul karim mia (http://www.abdulkarimmia.com/)

  Release notes:
  0.1 Initial version
  Donate (optional):
  If you find this script helpful, you can buy me a coffee
  - via PayPal https://paypal.me/akmia51
  NOTICE:
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale
  Released under the GNU license
    
  Check other author's scripts: https://github.com/abdul-karim-mia
*/
#target photoshop
var imgF = Folder.selectDialog("Select Input Folder");
if (imgF) {
  var img = imgF.getFiles(/\.(nef|cr2|crw|dcs|raf|arw|orf|dng|jpg|jpe|jpeg|tif|tiff|psd|eps|png|bmp)$/i);
    if (img.length) {
        var sav = Folder.selectDialog('Select Output Folder');
        if (sav) {
            for (i = 0; i < img.length; i++) {
                if (open(img[i])) {
                    var doc = activeDocument;
                    var oldHis = doc.activeHistoryState;
                    var docW = doc.width.as("in");
                    var docH = doc.height.as("in");
                    doc.crop([UnitValue(0, 'in'), UnitValue(0, 'in'), UnitValue(docW, 'in'), UnitValue(docW, 'in')], false, UnitValue(docW, 'in'), UnitValue(docH / 2, 'in'));
                    doc.saveAs(new File(sav + '/' + doc.name.split('.').slice(0, -1).join('.') + '_1.png'), new PNGSaveOptions(), true);
                    doc.activeHistoryState = oldHis;
                    doc.crop([UnitValue(0, 'in'), UnitValue(docH / 2, 'in'), UnitValue(docW, 'in'), UnitValue(docH, 'in')], false, UnitValue(docW, 'in'), UnitValue(docH / 2, 'in'));
                    doc.saveAs(new File(sav + '/' + doc.name.split('.').slice(0, -1).join('.') + '_2.png'), new PNGSaveOptions(), true);
                    doc.close(SaveOptions.DONOTSAVECHANGES);
                }
            }
        }
    }else{alert('No Image Found In Folder:-\n'+decodeURI(imgF))}
}