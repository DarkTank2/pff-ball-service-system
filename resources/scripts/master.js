document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var options={};
    var instances = M.Collapsible.init(elems, options);
  });

function sendOrder(orderIndex, index, type) {
    alert("Sent order: " + orderIndex);
    var elems = document.querySelectorAll('.collapsible');
    var elem = M.Collapsible.getInstance(elems[0]);
    elem.open(index);
}