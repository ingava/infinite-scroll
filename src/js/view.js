var view = (function () {

    var API_URL = 'https://api.dribbble.com/v1/';
    var accessToken = 'access_token=464ec125642a1cc42ce764e163de768ef6f8dae327100e44cabf407d3af05dbc';
    var searchCriterion = 'shots?';
    var currentlyLoading;
    var pageNumber = 1;

    var loadShots = function () {

        currentlyLoading = true;
        var promise = service.getShots(API_URL + searchCriterion + 'page=' + pageNumber + '&per_page=15&' + accessToken);
        promise.then(function (data) {
            data.forEach(function (item) {
                cloneDiv(item.images.hidpi, item.id);
            });
            currentlyLoading = false;
            pageNumber++;
        }).catch(function (error) {
            console.log(error);
        })
    };

    var postStatus = function (url, id, boolean) {
        service.postStatus(url, id, boolean);
    };

    var cloneDiv = function (url, id) {

        var template = document.getElementById('shot-template').content.cloneNode(true);
        var shot = template.querySelector('.shot');
        shot.src = url;
        shot.id = id;
        var button = template.querySelector('.favourite-button');
        button.addEventListener('click', markFavourite(button, id));
        var imageWrapper = document.querySelector('.main-container');
        imageWrapper.appendChild(template);
    };

    var markFavourite = function (element, id) {
        
        return function () {
            element.classList.toggle('liked');

            //posting to fake server for testing

            if (element.classList.contains('liked')) {
                postStatus('http://httpbin.org/post', id, true);
            } else {
                postStatus('http://httpbin.org/post', id, false);
            }
        }
    };
    
    var addScrollListener = function () {

        document.addEventListener('scroll', function () {
            var distanceToBottom = service.getDistanceToBottom();
            if (distanceToBottom == 0 && currentlyLoading === false) {
                loadShots();
            }
        })

    };

    var init = function () {
        loadShots();
        addScrollListener();
    };

    return {
        init: init,
    }

})();
