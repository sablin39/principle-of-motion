var topic1src = "images/arrow_browse.gif"
var topic2src = "images/arrow_browse2.gif"
var toc1src = "images/arrow_toc.gif"
var toc2src = "images/arrow_toc2.gif"
var topic1alt = "Click to expand topic"
var topic2alt = "Click to collapse topic"

//===========================================================================
// Show or hide categories (topics) having targetid.  Subtopics are encased
// below their parents within a table, so the calling proecedure passes
// the id of the subtopic table (targetid) to show / hide.
// arrowid -- id of arrow image generating the event
// targetid -- the id of the table containing the subtopics
//===========================================================================
function CatChange(arrowid, targetid)
  {
  var arrow = document.getElementById(arrowid)
  var target = document.getElementById(targetid)
  if(arrow && target)
    {
    if(arrow.src.indexOf("arrow_browse2.gif")>=0)
      {
      target.style.display='none'
      arrow.src = topic1src
      arrow.alt = topic1alt
      }
    else if (arrow.src.indexOf("arrow_browse.gif")>=0)
      {
      target.style.display=''
      arrow.src = topic2src
      arrow.alt = topic2alt
      }
    }
  }

//===========================================================================
// The toc table is given the id TOCTABLE in expandotoc.xsl.  Get this table
// and close or open all rows with the name "rowname".  "rowname" should
// be the chunk to be shown / hidden.  Only rows whose levels are >2 are
// given names, so only level 3 rows will be shown / hidden.
// arrowid -- id of arrow image generating the event
// rowname -- the name of rows within TOCTABLE that should be shown / hidden
//===========================================================================
function TocChange(arrowid, rowname)
  {
  var arrow = document.getElementById(arrowid)

  var tbody = arrow.parentNode;
  while (tbody) {
      if (tbody.nodeName == "TABLE" || tbody.nodeName == "TBODY") {
          break;
      }
      tbody = tbody.parentNode;
  }
 
  if(arrow && rowname)
    {
    if(arrow.src.indexOf("arrow_browse2.gif")>=0)
      {
      CloseChildren(tbody, rowname)
      arrow.src = topic1src
      }
    else if (arrow.src.indexOf("arrow_browse.gif")>=0)
      {
      OpenChildren(tbody, rowname)
      arrow.src = topic2src
      }
    else if (arrow.src.indexOf("arrow_toc2.gif")>=0)
      {
      CloseChildren(tbody, rowname)
      arrow.src = toc1src
      }
    else if (arrow.src.indexOf("arrow_toc.gif")>=0)
      {
      OpenChildren(tbody, rowname)
      arrow.src = toc2src
      }
    }
  }

function OpenChildren(table, rowname)
  {
  var rows = table.rows;
  for (var i=0; i < rows.length; i++)
    {
    if (rows[i].getAttribute("name") == rowname)
      {
      rows[i].style.display=''
      }
    }
  }

function CloseChildren(table, rowname)
  {
  var rows = table.rows;
  for (var i=0; i < rows.length; i++)
    {
    if (rows[i].getAttribute("name") == rowname)
      {
      rows[i].style.display = "none"
      }
    }
  }

