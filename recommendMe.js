/*
 * user has clicked on the recommend icon
 */
function doRecommending(bookid,yesno)
{
   var recommendationsUnset = document.getElementById("RECOMMENDATION_UNSET");
   var recommendationsOn = document.getElementById("RECOMMENDATION_YES");
   var recommendationsNo = document.getElementById("RECOMMENDATION_NO");
   if (yesno == 1) {
       recommendationsOn.style.display="";
       recommendationsNo.style.display="none";
       recommendationsUnset.style.display="none";
   }
   else if (yesno == -1) {
       recommendationsUnset.style.display="none";
       recommendationsOn.style.display="none";
       recommendationsNo.style.display="";
   }
   else {
       recommendationsUnset.style.display="";
       recommendationsOn.style.display="none";
       recommendationsNo.style.display="none";
   }
   var dataSource =  "data.asp?svc=recommendations&data=" + bookid + "&data=" + yesno;
   var _datenow = new Date();  
   dataSource += "&time=" + _datenow.getTime();  // make absolutely sure nobody caches it
   XMLHttpRequestObject.open("GET", dataSource);
   XMLHttpRequestObject.onreadystatechange = function() { // don't care
   }
   XMLHttpRequestObject.send(null);
}    

var bestreadCoverimages = new Array();
/*
 * place the bestread hat where it belongs on the coverimage's head
 */
function slideBestread(bookid) {
    slideBestread(bookid,true);
}
/**
 *  called when coverimage is loaded.
 *  under IE this sometimes has a 0 position 
 */
function isaBestread(bookid) {
   var cover = document.getElementById("COVERIMAGE" + bookid);
   if (cover != null) {
      var pos = getPosition(cover);
      bestreadCoverimages[bestreadCoverimages.length] = bookid;
      if (pos[0] != 0) {
          slideBestread(bookid);
      }
   }
 }
function slideBestread(bookid) {
   var me = document.getElementById("BESTREADICON" + bookid);
   var cover = document.getElementById("COVERIMAGE" + bookid);
   if (me != null && cover != null) {
      var pos = getPosition(cover);
      me.style.display="";
      me.style.top = pos[1] - (me.clientHeight / 2) + 8;
      me.style.left = pos[0] - (me.clientWidth / 2) + 6;
   }
}

/*
 * Stinking IE will sometimes call coverimage onloads BEFORE the elements it's nested within have their positions set, thus the hat slides to the upper left hand corner
 * this loops around the bestread books on the page and repositions them.  called off the body onload
 */
function slideAllBestreads() {
    for (var i = 0; i < bestreadCoverimages.length; i++) {
        slideBestread(bestreadCoverimages[i],false);
    }
}

