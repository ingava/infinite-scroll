var service = (function () {

    var getShots = function (url) {

        return new Promise(function(resolve, reject){
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, true);
            xhttp.onload = function(){
                if (xhttp.status == 200) {
                    resolve(JSON.parse(xhttp.response));
                } else {
                    reject(xhttp.statusText);
                }
            };
            xhttp.onerror = function(){
                reject(xhttp.statusText);
            };
            xhttp.send();
        });
    };

    var postStatus = function (url, id, boolean) {

        var params = {id: id, isFavourite: boolean};
        return new Promise(function(resolve, reject){
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, true);
            xhttp.onload = function(){
                if (xhttp.status == 200) {
                    resolve(JSON.parse(xhttp.response));
                } else {
                    reject(xhttp.statusText);
                }
            };
            xhttp.onerror = function(){
                reject(xhttp.statusText);
            };
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(params));
        });
    };

    var getDistanceToBottom = function() {

        var scrollPosition = window.pageYOffset;
        var windowSize     = window.innerHeight;
        var bodyHeight     = document.body.offsetHeight;

        return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
    };

    return {
        getShots: getShots,
        getDistanceToBottom: getDistanceToBottom,
        postStatus: postStatus,
    }

})();
