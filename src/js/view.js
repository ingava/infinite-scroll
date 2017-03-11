var loader = (function () {

    var API_URL = 'https://api.dribbble.com/v1/';
    var accessToken = 'access_token=464ec125642a1cc42ce764e163de768ef6f8dae327100e44cabf407d3af05dbc';
    var searchCriterion = 'shots?';
    var currentlyLoading;

    var loadShots = function () {

        currentlyLoading = true;
        var promise = service.getShots(API_URL + searchCriterion + accessToken);
        promise.then(function (data) {
            data.forEach(function (item) {
                cloneDiv(item.images.hidpi);
                currentlyLoading = false;
            })
        });
    };

    var cloneDiv = function (url) {

        var template = document.getElementById('shot-template').content.cloneNode(true);
        var shot = template.querySelector('.shot');
        shot.src = url;
        var imageWrapper = document.querySelector('.main-container');
        imageWrapper.appendChild(template);
    };
    
    var loadMoreItems = function () {

        document.addEventListener('scroll', function () {
            var distanceToBottom = service.getDistanceToBottom();
            console.log(distanceToBottom);

            if (distanceToBottom == 0 && currentlyLoading === false) {
                loadShots();
            }
        })

    };


    return {
        loadShots: loadShots,
        loadMoreItems: loadMoreItems,
    }

})();
