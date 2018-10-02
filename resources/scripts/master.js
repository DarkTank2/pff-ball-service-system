document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var options={};
    var instances = M.Collapsible.init(elems, options);
  });

function sendOrder(orderIndex, index, type) {
    var ind = undefined;
    //alert("Sent order: " + orderIndex);
    var elems = document.querySelectorAll('.collapsible');
    if(type == "food")
    {
        ind = 0;
    }
    else if(type == "drinks")
    {
        ind = 1;
    }
    if(ind != undefined)
    {
        M.toast({html: 'Du Lügenlord das war ein richitger Typ!', classes: "rounded hoverable"});
        var elem = M.Collapsible.getInstance(elems[ind]);
        elem.open(index);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // console.log("getOwnAssetsRoot() document = " + xhttp.responseText);
                // success(JSON.parse(xhttp.responseText)); //return the assetinfo to the successcallback
                // console.log(type+index);
                document.getElementById(type+index).innerHTML = xhttp.responseText;
            }
        };
        xhttp.open("GET", "/database/getFirstOrderFood?index=" + index, true);
        xhttp.send();
    }
    else{
        M.toast({html: 'Du Lügenlord das war kein  richtiger Typ!'});
    }
}