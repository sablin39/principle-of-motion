function toggleFilter(onoff,location) {
    var filterOff = document.getElementById("filterSelectClosed" + location);
    var filterOn = document.getElementById("filterSelectOpen" + location);
    var control = document.getElementById("FilterControlForm" + location);
    if (onoff == 0) {
        filterOff.style.display="inline";
        filterOn.style.display="none";
        control.style.display="none";
    }
    else {
        filterOff.style.display="none";
        filterOn.style.display="inline";
        control.style.display="";
    }
    slideAllBestreads();
}
