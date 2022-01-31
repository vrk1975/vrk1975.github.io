const thumbnailUrl = "https://1967138230.rsc.cdn77.org/routes/<routeId>/video/thumbnail_313x147.png";
const elevationUrl = "https://1967138230.rsc.cdn77.org/routes/<routeId>/profile/profile_313x147_transparent.png";
const routeUrl = "https://my.rouvy.com/virtual-routes/detail/<routeId>";

var routes;

window.onload = function () {
    let req = new XMLHttpRequest();
    req.open("get", "routes.json");
    req.onreadystatechange = (xhr, ev) => {
        routes = eval(req.responseText);
        populateRoutes();
    }
    req.send();
}

function makeRouteUrl(url, routeId) {
    return url.replace('<routeId>', routeId);
}

function populateRoutes() {
    
}