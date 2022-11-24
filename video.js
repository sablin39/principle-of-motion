//===========================================================================
// Submit the Companion files form
//===========================================================================
function GetCompanion(id)
  {
  var form = document.forms["CompanionFiles"]
  var elem = document.getElementById("uniqueid");
  if(elem && form)
    {
    elem.value = id;
    form.submit();
    }
  }
