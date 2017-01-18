function makeCarousel(containerDivClass, imageClass, imageChangeInterval, opacityChangeStep) {
    // all times are in milliseconds, opacity may change from 0 (invisible) to 1 (fully solid)
    var timeForOpacityChangeStep = imageChangeInterval * opacityChangeStep / 2;

    var IE8Flag = (navigator.appVersion.indexOf("MSIE") != -1) && (parseInt(navigator.appVersion.charAt(0)) < 9);
    if (IE8Flag) console.log('makeCarousel: switching to IE8 mode ...');

    var allImages = document.querySelectorAll('.' + containerDivClass + ' > .' + imageClass);
    if (allImages.length < 2) return; // one or zero images, no animations possible

    for (var iIndex = 0; iIndex < allImages.length; iIndex++)
        allImages[iIndex].style.display = 'none'; // hide all elements

    iIndex = 0;
    if (IE8Flag) {
        allImages[iIndex].style.display = 'block';
        var interval = setInterval(changeImage, imageChangeInterval);
    }
    else {
        var fadeTimer = setTimeout(function blinkFade() {
            fadeSingleImageInOut();
            if (++iIndex > allImages.length - 1) iIndex = 0;
            fadeTimer = setTimeout(blinkFade, imageChangeInterval);
        }, 100);
    }

    function changeImage() {
        var currElement = allImages[iIndex];
        currElement.style.display = 'none';
        if (++iIndex > allImages.length - 1) iIndex = 0;
        currElement = allImages[iIndex];
        currElement.style.display = 'block';
    }

    function fadeSingleImageInOut() {
        var currElement = allImages[iIndex];
        var currOpacity = 0, dOpacity = opacityChangeStep;
        currElement.style.opacity = currOpacity;
        currElement.style.display = 'block';
        var opacityTimer = setInterval(function () {
            currElement.style.opacity = currOpacity;
            currOpacity = Math.round((currOpacity + dOpacity) * 100) / 100;
            if (currOpacity > 1) {
                currOpacity = 1;
                dOpacity = -dOpacity;
            }
            if (currOpacity < 0) {
                currOpacity = 0;
                clearInterval(opacityTimer);
                currElement.style.display = 'none';
            }
        }, timeForOpacityChangeStep);
    }
}
