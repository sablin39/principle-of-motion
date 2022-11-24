  //============================================================
  //  NOTE: ie doesn't support table-row display style, set to empty
  //        instead.
  //        also, ie's innerHTML doesnt work on tables, need invisible
  //        span to aim at
  //=============================================================
function toggleChapterTocTab(toc,working,hits) {   // sets the visibility of the 3 rows to create the tabbed sort of look
    var tocrow =  document.getElementById("TOCVIEW");
    var searchhitsrow =  document.getElementById("SEARCHHITSVIEW");
    var workingrow =  document.getElementById("TRANSITIONVIEW");
    if (tocrow != null) {
        if (toc) {
            tocrow.style.display = "";
        }
        else {
            tocrow.style.display = "none";
        }
    }
    if (workingrow != null) {
        if (working) {
            workingrow.style.display = "";
        }
        else {
            workingrow.style.display = "none";
        }
    }
    if (searchhitsrow != null) {
        if (hits) {
            searchhitsrow.style.display = "";
        }
        else {
            searchhitsrow.style.display = "none";
        }
    }
}

function ShowChapterTocHits(bookid, chunkid) {   // displays all the hits for the book instead of the section toc
    var param = "?svc=4";
    if(XMLHttpRequestObject) {
        var obj = document.getElementById("TOCTABLE");    // default toc table
        var hitObj = document.getElementById("CHAPTERHITS" + bookid);  // table of hits in the book
        if (hitObj != null) {    // we have already done the work
            obj.style.display='none';      // hide the default toc
            hitObj.style.display='inline';   // show the hits
            toggleChapterTocTab(false,false,true);   // set the tab to the hits setting
        }
        else {   // oops, we have to go make one
            toggleChapterTocTab(false,true,false);          // set the tab to its "working" setting
            hitObj = obj.cloneNode(false);          // make a copy of the toc table and 
            hitObj.setAttribute("id","CHAPTERHITS" + bookid);  
            hitObj.style.display='none';
            obj.parentNode.insertBefore(hitObj,obj); // insert it into the dom

            var dataSource =  "data.asp" + param + "&data="+bookid+"&data="+chunkid+"&tab=hits";
            XMLHttpRequestObject.open("GET", dataSource);   // open connection to the home planet, will get the formatted search hits for this book
            XMLHttpRequestObject.onreadystatechange = function() {  // call back function which is called when the hits rain down upon us
                if (XMLHttpRequestObject.readyState == 4 &&
                    XMLHttpRequestObject.status == 200) {
                        var _responseText = XMLHttpRequestObject.responseText;
                        if (_responseText == null || _responseText.indexOf("<error>") != -1) {
                            toggleChapterTocTab(true,false,false);  // book wasn't a hit
                        }
                        else {
                            var span = document.getElementById("HIDDENTOCTABLESPAN");  // have to use a hidden span because IE won't let us use innerHTML on table rows
                            span.innerHTML =  _responseText;   // attach them to our table
                            var table = span.firstChild;
                            span.removeChild(table);    // don't want future getElementById calls to hit us!
                            var tbody = table.getElementsByTagName("TBODY")[0];  // find tbody
                            hitObj.appendChild(tbody);       // and attach it to our chapter hits table
                            hitObj.style.display='inline';   // show the hits
                            obj.style.display='none';      // hide the default toc
                            toggleChapterTocTab(false,false,true);  // set tabs
                        }
                    }
            } // end of XMLHttpRequestObject callback function
            XMLHttpRequestObject.send(null);   // starts execution on the home planet
        }
    }
}

function HideChapterTocHits(bookid, chunkid)  {   // reverts back to the  section toc
    toggleChapterTocTab(true,false,false);  // set the tab to its section toc setting
    var obj = document.getElementById("TOCTABLE");
    var hitObj =  document.getElementById("CHAPTERHITS" + bookid);
    obj.style.display='inline';
    hitObj.style.display='none';
}
//======================================================
//  code for including all section hits in booklist
//======================================================
function toggleSectionImages(bookid,on,working,off) {  // toggle the images
    var imgOn = document.getElementById("SHOW_ALL_SECTION_HITS" + bookid);
    var imgWorking = document.getElementById("WORKING_ON_SECTION_HITS" + bookid);
    var imgOff = document.getElementById("SHOW_SOME_SECTION_HITS" + bookid);
    if (imgOn != null) {
        imgOn.style.display = on;
    }
    if (imgWorking != null) {
        imgWorking.style.display = working;
    }
    if (imgOff != null) {
        imgOff.style.display = off;     
    }
}
function toggleSectionTables(bookid,on,off) {    //  toggle html data tables 
    var defaultTable = document.getElementById("BOOKLIST" + bookid);
    if (defaultTable == null) {
        return null;
    }
    defaultTable.style.display = on;
    var allSectionHits = document.getElementById("SECTIONHITS" + bookid);
    if (allSectionHits != null) {
        allSectionHits.style.display = off;
    }
    slideAllBestreads();
}
//===========================================================
// Show section hits in the book list
//===========================================================
function ShowAllSectionHits(bookid)
{
    var allSectionHits = document.getElementById("SECTIONHITS" + bookid);
    if (allSectionHits != null) {
        toggleSectionImages(bookid,'none','none','inline');
        toggleSectionTables(bookid,'none','inline');
    }
    else {
        toggleSectionImages(bookid,'none','inline','none');  // set working flag
        var defaultTable = document.getElementById("BOOKLIST" + bookid);
        allSectionHits = defaultTable.cloneNode(false);          // make a copy of the toc table and 
        allSectionHits.setAttribute("id","SECTIONHITS" + bookid);  
        allSectionHits.style.display='none';
        defaultTable.parentNode.insertBefore(allSectionHits,defaultTable); // insert it into the dom
        var param = "?svc=4";
        var dataSource =  "data.asp" + param + "&data="+bookid + "&indent=1";
        XMLHttpRequestObject.open("GET", dataSource);   // open connection to the home planet, will get the formatted search hits for this book
        XMLHttpRequestObject.onreadystatechange = function()   // call back function which is called when the hits rain down upon us
            {
                if (XMLHttpRequestObject.readyState == 4 &&
                    XMLHttpRequestObject.status == 200) {
                        var span = document.getElementById("painspan" + bookid);
                        span.innerHTML =
                        XMLHttpRequestObject.responseText;   // attach them to our table
                        var table = span.firstChild;
                        var tbody = span.getElementsByTagName("TBODY")[0];
                        allSectionHits.appendChild(tbody);
                        toggleSectionImages(bookid,'none','none','inline');
                        toggleSectionTables(bookid,'none','inline');
                    }
            }
        XMLHttpRequestObject.send(null);   // starts execution on the home planet
    }
}
function HideTopSectionHits(bookid)
{
    toggleSectionImages(bookid,'inline','none','none');
    toggleSectionTables(bookid,'inline','none');
}

var saveHitColor = null;
var saveHitBackground = null;

//  gets location of window within the page
function getScrollingPosition(doc)
{
    var position = [0, 0];

    if (typeof window.pageYOffset != 'undefined')
        {
            position = [
                        window.pageXOffset,
                        window.pageYOffset
            ];
        }

    else if (typeof doc.documentElement.scrollTop
             != 'undefined' && (doc.documentElement.scrollTop > 0 ||
                                doc.documentElement.scrollLeft > 0))
        {
            position = [
                        doc.documentElement.scrollLeft,
                        doc.documentElement.scrollTop
            ];
        }

    else if (typeof doc.body.scrollTop != 'undefined')
        {
            position = [
                        doc.body.scrollLeft,
                        doc.body.scrollTop
            ];
        }

    return position;
}

// how big is our window?
function getViewportSize(doc)
{
    var size = [0, 0];

    if (typeof window.innerWidth != 'undefined')
        {
            size = [
                    window.innerWidth,
                    window.innerHeight
            ];
        }
    else if (typeof doc.documentElement != 'undefined'
             && typeof doc.documentElement.clientWidth != 'undefined' 
             && doc.documentElement.clientWidth != 0)
        {
            size = [
                    doc.documentElement.clientWidth,
                    doc.documentElement.clientHeight
            ];
        }
    else
        {
            size = [
                    doc.getElementsByTagName('body')[0].clientWidth,
                    doc.getElementsByTagName('body')[0].clientHeight
            ];
        }

    return size;
}
// gets elements position within the page
function getPosition(theElement)
{
    var positionX = 0;
    var positionY = 0;

    while (theElement != null)
        {
            positionX += theElement.offsetLeft;
            positionY += theElement.offsetTop;
            theElement = theElement.offsetParent;
        }

    return [positionX, positionY];
}

//----------------------------
//  hit navigation
//----------------------------
function nextHit(direction, every)
{
    if (every == null) {
        every = true;
    }
    var targ;
    //  alert("nexthit");
    // get our font element
    var e = window.event;
    //  alert("event");
    if (e != null) {
        if (e.target) { 
            targ = e.target;
        }
        else if (e.srcElement) {
            targ = e.srcElement;
        }
        if (targ.nodeType == 3) { // defeat Safari bug
            targ = targ.parentNode;
        }
    }
    //  alert("3");
    var framed = false;
    var doc = document;
    var contentframe = top.frames["Content"];
    if (contentframe != null) {
        framed = true;
        doc = contentframe.document;
    }
    if (doc.readyState == null) {
        if (doc.body.innerHTML == null) {
            return;
        }
    }
    else if (doc.readyState != "complete") {
        return;
    }
    if (targ != null) {
        if (targ.className != "b24-hit" && targ.className != "b24-currenthit") {
            targ = null;
        }
    }
    
    var lastHit = doc.getElementById("js-currenthit");
    if (lastHit != null) {
        //    alert("oldHit");
        lastHit.id=null;
        //        lastHit.style.color=saveHitColor;
        //        lastHit.style.backgroundColor="white";
        lastHit.className = "b24-hit";
        if (targ == null) {
            targ = lastHit;
        }
    }
    var takeThisOne = false;
    var fontElements = doc.getElementsByTagName("FONT");
    if (targ == null) {
        // remove highlighting from last call
        for (var f = 0; fontElements != null && f < fontElements.length; f++) {
            if (fontElements[f].className == "b24-hit" || fontElements[f].className == "b24-currenthit"  || fontElements[f].className == "b24-lasthit") {
                targ = fontElements[f];
                if (lastHit == null) {  // first call so we pick the first in the chunk
                    takeThisOne = true;
                }
                break;
            }
        }
    }

    if (targ != null) {  // have at least one hit.
        var windowPosition = getScrollingPosition(doc);      
        var windowSize = getViewportSize(doc);     
        var pos = 0;
        for (pos = 0; pos < fontElements.length; pos++) {   // locate it in the array of font elements
            if (targ == fontElements[pos]) {
                break;
            }
        }
        if (pos == fontElements.length) {
            targ = null;
        }
        //  alert("about to take a walk");
        //  hunt for the next hit
        if (!takeThisOne) {
            for (pos = pos + 1; pos < fontElements.length; pos++) {
                var _f = fontElements[pos];
                if (_f.className == "b24-hit" || _f.className == "b24-currenthit" || _f.className == "b24_lasthit") {
                    targ = _f;
                    break;
                }
            }
        }
        if (pos < fontElements.length) { // found one
            var myPosition = getPosition(targ);
            //                alert(myPosition[0] + "," + myPosition[1]);
            //                alert(windowPosition[0] + "," + windowPosition[1]);
            //                alert(windowSize[0] + "," + windowSize[1]);
            if (myPosition[0] < windowPosition[0] ||    // are we off the top?
                myPosition[1] < windowPosition[1]) {    // yes, keep going until we come to the window
                for (pos = pos + 1; pos < fontElements.length; pos++) {
                    var _f = fontElements[pos];
                    if (_f.className == "b24-hit" || _f.className == "b24-currenthit" || _f.className == "b24_lasthit") {
                        targ = _f;
                        myPosition = getPosition(targ);
                        if (myPosition[0] < windowPosition[0] ||    // are we off the top?
                            myPosition[1] < windowPosition[1]) {    // yes, keep going until we come to the window
                            continue;
                        }
                        break;
                    }
                }
            }
            if (pos < fontElements.length) {  // visiting every one
                if (myPosition[0] - windowPosition[0] > windowSize[0] ||        // are we off the bottom?
                    myPosition[1] - windowPosition[1] > windowSize[1]) {        // yes!  move the window to us
                    if (myPosition[0] - windowPosition[0] < windowSize[0]) {
                        myPosition[0] = windowPosition[0];
                    }
                    if (myPosition[1] - windowPosition[1] < windowSize[1]) {
                        myPosition[1] = windowPosition[1];
                    }
                    window.scrollTo(myPosition[0], myPosition[1]);
                    //                    saveHitColor = targ.style.color;
                    //                    targ.style.color="white";
                }
                //                    saveHitColor = targ.style.color;
                //                    targ.style.color="white";
                //                    targ.style.backgroundColor = "red";
                targ.id="js-currenthit";
                for (pos = pos + 1; pos < fontElements.length; pos++) {
                    var _f = fontElements[pos];
                    if (_f.className == "b24-hit" || _f.className == "b24-currenthit" || _f.className == "b24_lasthit") {
                        targ.className="b24-currenthit";
                        return;
                    }
                }
                targ.className="b24-lasthit";
                //                    targ.style.backgroundColor = "red";
                return;
            }
        }
    }
    if (framed) {  // if we get here we need to go on to the next hit
        var tocframe = top.frames['Toc'];
        if (tocframe != null) {
            tocframe.nextHitChunk(direction);
        }
    }
    else {
        nextHitChunk(direction);
    }
    return;
}

function toggleTocHits(sname,svalue,tableToToggle,antiTableToToggle,frameRefresh) {
    if (frameRefresh == null) {
       frameRefresh = false;
    }
    var troubleSpot = document.getElementById(sname);
    if (troubleSpot) {
        var targetTable =  document.getElementById(tableToToggle);
        var antiTargetTable = null;
        if (antiTableToToggle != null && antiTableToToggle != 'none') {
            antiTargetTable =  document.getElementById(antiTableToToggle);
        }
        var off = (svalue == 0 ? 1 : 0);
        if (targetTable != null) {
            var toggles = troubleSpot.getElementsByTagName("A");
            if (toggles && toggles.length == 2) {
//               toggles[svalue].setAttribute("STYLE","display:inline");
               toggles[svalue].style.display = "inline";
//               toggles[off].setAttribute("STYLE","display:none");
               toggles[off].style.display = "none";
            }
            if (off == 0) {
//               targetTable.setAttribute("STYLE","");
               targetTable.style.display = "";
            } 
            else {
               if (tableToToggle == 'TOCTABLE') {
                  var _frameset = parent.document.getElementById('LNAVFRAMESET');
                  if (_frameset != null) {
                      _frameset.cols = '24,*';
                  }
               }
//               targetTable.setAttribute("STYLE","display:none");
               targetTable.style.display = "none";
            }
        }
        if (antiTargetTable != null) { // reverse of the above
            if (off == 0) {
               if (tableToToggle == 'TOCTABLE') {
                   var _frameset = parent.document.getElementById('LNAVFRAMESET');
                   if (_frameset != null) {
                       _frameset.cols = '184,*';
                   }
               }
//               antiTargetTable.setAttribute("STYLE","display:none");
               antiTargetTable.style.display = "none";
            } 
            else {
//               antiTargetTable.setAttribute("STYLE","");
               antiTargetTable.style.display = "";
            }
        }
        var dataSource =  "data.asp?svc=state&data=" + sname + "&data=" + svalue;
        var _datenow = new Date();
        dataSource += "&time=" + _datenow.getTime();
        XMLHttpRequestObject.open("GET", dataSource);
        XMLHttpRequestObject.onreadystatechange = function() { // don't care
            if (XMLHttpRequestObject.readyState == 4 &&
                XMLHttpRequestObject.status == 200) {
                var tocframe = top.frames['Toc'];
                if (tocframe == null) {  // revisit home planet to get resized/reflowed tables
                   var where =  top.location.href.indexOf("#");
                   if (where == -1) {
                       top.location.href = top.location.href // + "&renew";
                   }
                   else {
                       top.location.href = top.location.href.substring(0,where) // + "&renew" + top.location.href.substring(0,where);
                   }
                }
                else if (frameRefresh) {  // ok this means redisplay the frame with new state
                   var tocframe = top.frames['Toc'];
                   if (tocframe == null) {
                       tocframe = top;
                   }
                   var where =  tocframe.location.href.indexOf("#");
                   if (where == -1) {
                       tocframe.location.href = tocframe.location.href // + "&renew";
                   }
                   else {
                       tocframe.location.href = tocframe.location.href.substring(0,where) // + "&renew" + tocframe.location.href.substring(0,where);
                   }
                }
            }
        }
        XMLHttpRequestObject.send(null);
    }
}

function nextHitChunk(dir) {
    //        alert("calling next hit chunk");
    var hitrow = document.getElementById("currentHitChunk");
    var thisrow = hitrow;
    if (hitrow != null) {
        //        alert("have hit row");
        
        if (dir == "forward") {
            while (null != (hitrow = hitrow.nextSibling)) { // the next row
                if (hitrow.nodeType == 1) {  // firefox throws text nodes our way
                    break;
                }
            }
        }
        else {
            while (null != (hitrow = hitrow.previousSibling)) { // the next row
                if (hitrow.nodeType == 1) {  // firefox throws text nodes our way
                    break;
                }
            }
        }
    }
    if (hitrow == null) {  // this is a pain.  we're at the end or they were sitting on a chunk that isnt in the hit list,  just position at the first.  will make the whole thing seem like a loop
        if (thisrow == null) {  // a royal pain this chunk wasn't in the search results
            var hittable = document.getElementById("CHAPTERHITSTABLE");
            if (hittable == null) {
                //                    alert("no hit table at all");
                return;
            }
            thisrow = hittable.firstChild;
            while (thisrow.nodeType != 1 && null != (thisrow = thisrow.nextSibling)) { // the next row
            }
            if (thisrow == null) {
                //                    alert("crap");
            }
        }
        var tbody = thisrow.parentNode;
        if (dir == "forward") {
            hitrow = tbody.firstChild;
            while (hitrow.nodeType != 1 && null != (hitrow = hitrow.nextSibling)) { // the next row
            }
        }
        else {
            hitrow = tbody.lastChild;
            while (hitrow.nodeType != 1 && null != (hitrow = hitrow.previousSibling)) { // the next row
            }
        }
    }
    
    if (hitrow != null) {
        //            alert("have next hit row:" + hitrow.nodeName);
        var nextchunk = hitrow.getElementsByTagName("A");
        var href = null;
        if (nextchunk != null) {
            //                alert("have next chunk:" + nextchunk.length + ":" + nextchunk[0].nodeName);
            for (var a = 0; a < nextchunk.length; a++) {
                    //  alert("a:" + a);
                var A = nextchunk[a];
                href = A.href;
                if (href != null && href.length > 0) {
                    break;
                }
            }
        }
        if (href != null) {
            //                alert("href:" + href);
            top.location.href=href;
        }
    }
}
