  //============================================================
  function InsertCT(bid, cid, sText)
    {
    var id = "toc"+bid
    var table = document.getElementById(id);
    if(table)
      {
      for(var i=0;i<table.rows.length;i++)
      if(table.rows[i].id=="C"+cid)
        {
        var img1 = table.rows[i].cells[1].childNodes.item(0)
        var img2 = table.rows[i].cells[1].childNodes.item(1)
        var img3 = table.rows[i].cells[1].childNodes.item(2)
        img1.style.display = 'none'
        img2.style.display = 'none'
        img3.style.display = 'inline'
        var newrow = table.insertRow(i+1)
        newrow.insertCell(0)
        var newcell = newrow.insertCell(1)
        newcell.colSpan =4
        newcell.innerHTML += sText;
        break
        }
      }
    }
  //============================================================
  function Expand(bid, cid)
    {
    var param = "?svc=3"
    var cstable = document.getElementById("CS"+cid)
    var table = document.getElementById("toc"+bid)
    var cbmtable =  document.getElementById("CBM"+cid)
        
    if(cstable == null)
      {
      for(var i=0;i<table.rows.length;i++)
        if(table.rows[i].id=="C"+cid)
        {
        var img1 = table.rows[i].cells[1].childNodes.item(0)
        var img2 = table.rows[i].cells[1].childNodes.item(1)
        var img3 = table.rows[i].cells[1].childNodes.item(2)
        img1.style.display = 'none'
        img2.style.display = 'inline'
        img3.style.display = 'none'
        break;
        }
      param += "&data="+bid+"&data="+cid
//      window.frames["dataframe"].location.href = "data.asp"+param;
      var dataSource =  "data.asp" + param; 
      XMLHttpRequestObject.open("GET", dataSource);
      XMLHttpRequestObject.onreadystatechange = function()
      {
          if (XMLHttpRequestObject.readyState == 4 &&
              XMLHttpRequestObject.status == 200) {
                  InsertCT(bid,cid, XMLHttpRequestObject.responseText);
              }
          if (XMLHttpRequestObject.readyState == 4 &&
              XMLHttpRequestObject.status == 403) {
                  if (XMLHttpRequestObject.responseText.indexOf("errorcode='1'") != -1) {
                      window.location.reload();
                  }
                  else if (XMLHttpRequestObject.responseText.indexOf("errorcode=\"1\"") != -1) {
                      window.location.reload();
                  }
                  else if (XMLHttpRequestObject.responseText.indexOf("errorcode=1") != -1) {
                      window.location.reload();
                  }
                  else {
                      InsertCT(bid,cid, XMLHttpRequestObject.responseText);
                  }
              }
      }
      XMLHttpRequestObject.send(null);
      }
    else
      {
      cstable.style.display = 'inline'
      for(var i=0;i<table.rows.length;i++)
        if(table.rows[i].id=="C"+cid)
          {
        var img1 = table.rows[i].cells[1].childNodes.item(0)
        var img2 = table.rows[i].cells[1].childNodes.item(1)
        var img3 = table.rows[i].cells[1].childNodes.item(2)
        img1.style.display = 'none'
        img2.style.display = 'none'
        img3.style.display = 'inline'
          }
     }
    //      if(cbmtable)
    //    cbmtable.style.display = 'none' 
    }  
  //==========================================================
  function HideCT(bid, cid)
    {
    var id = "toc"+bid
    var table = document.getElementById(id);
    var cstable = document.getElementById("CS"+cid)
    var cbmtable =  document.getElementById("CBM"+cid)
    if(table)
      {
      for(var i=0;i<table.rows.length;i++)
        if(table.rows[i].id=="C"+cid)
          {
        var img1 = table.rows[i].cells[1].childNodes.item(0)
        var img2 = table.rows[i].cells[1].childNodes.item(1)
        var img3 = table.rows[i].cells[1].childNodes.item(2)
        img1.style.display = 'inline'
        img2.style.display = 'none'
        img3.style.display = 'none'
          cstable.style.display = 'none'
          }
      }
      if(cbmtable)
        cbmtable.style.display = 'inline' 
    }
//==========================================================
function showdiv(img,code)
  {
  var thisdoc = document;
  var elepos = getPosition(img);
  var viewportdem = getViewportSize(thisdoc);
  var scrollpos = getScrollingPosition(thisdoc);
  var relobjpos = elepos[1] - scrollpos[1]; 
  var halfviewport = Math.round(viewportdem[1]/2);
  var tailgoes = ((relobjpos<halfviewport) || (location.href.indexOf("toc.asp")>=0) || (location.href.indexOf("viewer_r.asp")>=0))? "up" :  (relobjpos>halfviewport)? "down" : null;
  var thebubblediv = (thisdoc.getElementById("thebubblediv")!=null)? thisdoc.getElementById("thebubblediv") : null;
  var bubbletable = (thisdoc.getElementById("bubble"+tailgoes)!=null)? thisdoc.getElementById("bubble"+tailgoes) : null;
  var otherbubble = (tailgoes=="up")? thisdoc.getElementById("bubbledown") : thisdoc.getElementById("bubbleup")
  var icontable = (thisdoc.getElementById("bubble"+tailgoes+"icons"))? thisdoc.getElementById("bubble"+tailgoes+"icons") : null;
  
  if(thebubblediv && bubbletable && icontable)
    {
    thebubblediv.style.display = "";
    bubbletable.style.display = "";
    otherbubble.style.display = "none"; 
    for(var x=1;x<icontable.rows.length;x++)
      {
      tr = thisdoc.getElementById(icontable.rows[x].id);
      var rowid = tr.id.substr(1);
      if(code & rowid)
        icontable.rows[x].style.display = "";
      else
        icontable.rows[x].style.display = "none";
      }
    var bubbleheight = bubbletable.offsetHeight;
    if(tailgoes=="up")
     poptop = elepos[1] + 16;
    else 
      poptop = elepos[1] - bubbleheight;
    thebubblediv.style.top = poptop;
    thebubblediv.style.left = elepos[0] - 76;
    } 
  }
//=========================================================
function hidediv()
  {
  pausecomp(1000);
  var thebubblediv = document.getElementById("thebubblediv");
  if(thebubblediv)
    thebubblediv.style.display = "none"; 
  }
//=========================================================
function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 
//=========================================================
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
//=========================================================
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
//=========================================================
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
//---- viewer image popping
function PopImage(id, src, width, height)
  {
  if(id)
    {
    var img1 = document.getElementById(id);
    if(img1)
      {
      img1.style.display = 'none';
      var img2 = document.getElementById(id+'$');
        {
        if(img2)
          {
          img2.style.display = 'inline';
          }
        else
          {
          node = img1.parentNode.parentNode
          node.innerHTML += '<IMG ID="'+id+'$" SRC="'+src+'" WIDTH="'+width+'" HEIGHT="'+height+'" ALT="Click to collapse" TITLE="Click to collapse" onClick="UnPopImage(\''+id+'\')" >'
          }
        }
      }
    }
  }

function UnPopImage(id)
  {
  if(id)
    {
    var img1 = document.getElementById(id);
    var img2 = document.getElementById(id+'$');
    if(img2) img2.style.display = 'none';
    if(img1) img1.style.display = 'inline';
    }
  }

//=========================================================
// Start of common code to support AJAX
//=========================================================

/*
coded by Kae - http://verens.com/
use this code as you wish, but retain this notice
*/


var kXHR_instances=0;
var kXHR_objs = new Array();

IFrameXMLHttpRequest=function(){
	var i=0;
	var url='';
	var responseText='';
	var iframe='';
	this.onreadystatechange=function(){
		return false;
	}
	this.open=function(method,url){
		//TODO: POST methods
		this.i=++kXHR_instances; // id number of this reques
		this.url=url + "&iframe=1";
    var el=document.getElementById('kXHR_iframe_'+this.i);
    if (el != null) {
        el.parentNode.removeChild(el);
    }
    //		document.body.appendChild(document.createElement('<iframe id="kXHR_iframe_'+this.i+'" style="display:none" src="/"></iframe>'));	
    var elm = document.createElement("iframe");
		elm.setAttribute("id",'kXHR_iframe_'+this.i);
    elm.setAttribute("style","display:none");
    elm.setAttribute("height","1");
    elm.setAttribute("width","1");
    //    elm.setAttribute("src","/");
		document.body.appendChild(elm);
  }
	this.send=function(postdata){
		//TODO: use the postdata
		var el = document.getElementById('kXHR_iframe_'+this.i);
    el.setAttribute("src",this.url);
		kXHR_objs[this.i]=this;
		setTimeout('IFrameXMLHttpRequest_checkState('+this.i+',2)',2);
	}
	return true;
}

function IFrameXMLHttpRequest_setErrorCode(responseText) {
    var t = "" + responseText;
    t = t.toLowerCase();
    var span = t.indexOf("span");
    if (span > 0 && span < 5) {
        var cls = t.indexOf("b24-duierror");
        if (cls > 0 && cls < 20) {
            return 403;
        }
    }
    else {
        return 200;
    }
}
IFrameXMLHttpRequest_checkState=function(inst,delay){
	var el=document.getElementById('kXHR_iframe_'+inst);
	if(el.readyState==null) {
      var responseText=document.frames['kXHR_iframe_'+inst].document.body.innerHTML;
      if (responseText != null) {
          kXHR_objs[inst].responseText=responseText;
          kXHR_objs[inst].readyState=4;
          kXHR_objs[inst].status= IFrameXMLHttpRequest_setErrorCode(responseText);
          el.parentNode.removeChild(el);
          kXHR_objs[inst].onreadystatechange();
      }
      else {
          delay*=1.5;
          setTimeout('IFrameXMLHttpRequest_checkState('+inst+','+delay+')',delay);
      }
  }
	else if(el.readyState=='complete'){
    var responseText=document.frames['kXHR_iframe_'+inst].document.body.innerHTML;
		kXHR_objs[inst].responseText=responseText;
		kXHR_objs[inst].readyState=4;
    kXHR_objs[inst].status= IFrameXMLHttpRequest_setErrorCode(responseText);
		el.parentNode.removeChild(el);
		kXHR_objs[inst].onreadystatechange();
	}else{
		delay*=1.5;
		setTimeout('IFrameXMLHttpRequest_checkState('+inst+','+delay+')',delay);
	}
}

var XMLHttpRequestObject;
if (window.XMLHttpRequest) {
    XMLHttpRequestObject = new XMLHttpRequest();
}
else if (window.ActiveXObject){ 
   XMLHttpRequestObject = new IFrameXMLHttpRequest();
}
else {
    XMLHttpRequestObject = new XMLHttpRequest();
    if (XMLHttpRequestObject == null) {
      XMLHttpRequestObject = new IFrameXMLHttpRequest();
    }
}

