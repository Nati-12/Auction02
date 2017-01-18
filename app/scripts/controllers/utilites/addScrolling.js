function addScrolling(headerID, containerID, footerID) {
    //add scroll to all sub-divs located inside the container.
    // Page structure is restricted to "header-container-footer".
    var resizeHappened = true, scrollAdderIsInProgress = false;

    var header = document.querySelectorAll('#' + headerID)[0],
        container = document.querySelectorAll('#' + containerID)[0];

// get actual scrollbar width
    var scrollWidth = getScrollWidth();

    var allElements2AddScroll = getElementChildren(container);

    var headerHeight = getTotalHeight(header);

    if (window.addEventListener) {
        window.addEventListener('resize', resizeFlagUpdater);
    } else if (document.attachEvent) {              // fcuk IE 8, polyfill it! https://gist.github.com/jonathantneal/3748027
        //document.attachEvent('onresize', resizeFlagUpdater);
        !window.addEventListener && function (e, t, n, r, i, s, o) {
            e[r] = t[r] = n[r] = function (e, t) {
                var n = this;
                o.unshift([n, e, t, function (e) {
                    e.currentTarget = n, e.preventDefault = function () {
                        e.returnValue = !1;
                    }, e.stopPropagation = function () {
                        e.cancelBubble = !0;
                    }, e.target = e.srcElement || n, t.call(n, e);
                }]), this.attachEvent("on" + e, o[0][3]);
            }, e[i] = t[i] = n[i] = function (e, t) {
                for (var n = 0, r; r = o[n]; ++n)if (r[0] == this && r[1] == e && r[2] == t)return this.detachEvent("on" + e, o.splice(n, 1)[0][3]);
            }, e[s] = t[s] = n[s] = function (e) {
                return this.fireEvent("on" + e.type, e);
            };
        }(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
        window.addEventListener('resize', resizeFlagUpdater);
    }

    var resizeControlInterval = setInterval(function () {
        addScrollToAllElements(allElements2AddScroll);
    }, 500);


    function addScrollToAllElements(allElements2AddScroll) {

        if (!resizeHappened || scrollAdderIsInProgress) return; // other instance of scroll adder is working right now
        scrollAdderIsInProgress = true;
        resizeHappened = false;

        var windowFullHeight = document.documentElement.clientHeight || document.body.clientHeight;

        for (var iCurrElement = 0; iCurrElement < allElements2AddScroll.length; iCurrElement++) {
            var currElement = allElements2AddScroll[iCurrElement];
            var currElementHeight = getTotalHeight(currElement);

            if (currElement.offsetTop + currElement.offsetHeight > windowFullHeight) {

                var newHeight = windowFullHeight - currElement.offsetTop;

                currElement.style.height = newHeight + 'px';
                currElement.style.overflow = 'scroll';
            }
            else {
                currElement.style.overflow = 'hidden';
                currElement.style.height = currElementHeight + 'px';
            }
        }
        scrollAdderIsInProgress = false;
    }

    function resizeFlagUpdater() {
        resizeHappened = true;
        // console.log('Resize event fired!!111', resizeHappened);
    }

}

function getScrollWidth() {
    var div = document.createElement('div');
    div.style.overflowX = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    var result = div.offsetHeight - div.clientHeight;
    document.body.removeChild(div);
    return result;
} // returns actual size of scrollbar in pixels
function getOriginalHeights(elements) {
    var result = [];
    for (var iCurrElement = 0; iCurrElement < elements.length; iCurrElement++) {
        result.push(getTotalHeight(elements[iCurrElement]));
    }
    return result;
}
function getOriginalWidths(elements) {
    var result = [];
    for (var iCurrElement = 0; iCurrElement < elements.length; iCurrElement++) {
        result.push(getTotalWidth(elements[iCurrElement]));
    }
    return result;
}
function getElementChildren(element) {
    var childNodes = element.childNodes,
        children = [],
        i = childNodes.length;
    while (i--) {
        if (childNodes[i].nodeType == 1) {
            children.unshift(childNodes[i]);
        }
    }
    return children;
}
function getElementStyle(element) {
    return window.getComputedStyle ? getComputedStyle(element, null) : element.currentStyle;
}
function getElementMargins(element) { // 0-top 1-right 2-bottom 3-left
    var margins = [];
    var elementStyle = getElementStyle(element);
    var marginTop = parseInt(elementStyle.marginTop), marginBottom = parseInt(elementStyle.marginBottom),
        marginLeft = parseInt(elementStyle.marginBottom), marginRight = parseInt(elementStyle.marginBottom);
    margins[0] = marginTop || 0;
    margins[1] = marginRight || 0;
    margins[2] = marginBottom || 0;
    margins[3] = marginLeft || 0;
    return margins;
}
function getTotalHeight(element) { // returns elemen's total height including paddings, borders, margins
    var height = element.offsetHeight;
    var margins = getElementMargins(element);
    height = parseFloat(height) + margins[0] + margins[2];
    return height;
}
function getTotalWidth(element) { // returns elemen's total height including paddings, borders, margins
    var width = element.offsetWidth;
    var margins = getElementMargins(element);
    width = parseFloat(width) + margins[1] + margins[3];
    return width;
}