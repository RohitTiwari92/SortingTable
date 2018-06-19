function sortTable(n) {

    var element = GetElementByClass('MemoClass', document.getElementById("myTable"));

    if (element.length > 0) {
        var elementIds = [];
        for (var j = 0; j < element.length; j++) {
            elementIds.push(element[j]);
        }
        for (var k = 0; k < elementIds.length ; k++) {
            var e = document.getElementById(elementIds[k].id);
            e.parentNode.removeChild(e);
        }
    }


    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0, totalRows;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = $('#myTable >tbody>tr.ContentFontColor');
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        totalRows = (rows.length - 1);
        for (i = 0; i <= totalRows ; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            if (i == totalRows)
                y = rows[i].getElementsByTagName("TD")[n];
            else
                y = rows[i + 1].getElementsByTagName("TD")[n];

            while (!y) {
                if (i != totalRows) i++;
                y = rows[i].getElementsByTagName("TD")[n];
            }
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (n == 6 || n == 7) {
                    var datex = getDates(trims(x.innerText));
                    var datey = getDates(trims(y.innerText));
                    if (datex < datey) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (trims(x.innerHTML.toLowerCase()) > trims(y.innerHTML.toLowerCase())) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (n == 6 || n == 7) {
                    var datex = getDates(trims(x.innerText));
                    var datey = getDates(trims(y.innerText));
                    if (datex > datey) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (trims(x.innerHTML.toLowerCase()) < trims(y.innerHTML.toLowerCase())) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
function trims(n) {
    return n.replace(/^\s+|\s+$/g, '');
}
function getDates(str) {
    if (str == "")
        str = "01-01-1900";
    var date = str.split('-').reverse();
    return new Date(date[0], date[1], date[2]);
}


function GetElementByClass(searchClass, node, single) {
    if (node.getElementsByClassName) {
        if (single) {
            return node.getElementsByClassName(searchClass)[0];
        } else {
            return node.getElementsByClassName(searchClass);
        }
    } else {
        var classElements = [],
            tag = '*';
        if (node == null) {
            node = document;
        }
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
        for (var i = 0, j = 0; i < elsLen; i++) {
            if (pattern.test(els[i].className)) {
                if (single) {
                    return els[i];
                } else {
                    classElements[j] = els[i];
                    j++;
                }
            }
        }
        return classElements;
    }
}
