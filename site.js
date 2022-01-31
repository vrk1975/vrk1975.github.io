const thumbnailUrl = "https://1967138230.rsc.cdn77.org/routes/<routeId>/video/thumbnail_313x147.png";
const elevationUrl = "https://1967138230.rsc.cdn77.org/routes/<routeId>/profile/profile_313x147_transparent.png";
const routeUrl = "https://my.rouvy.com/virtual-routes/detail/<routeId>";

var routes;

window.onload = function () {
    let req = new XMLHttpRequest();
    req.open("get", "routes.json");
    req.setRequestHeader();
    req.onreadystatechange = (xhr, ev) => {
        if (req.readyState == 4) {
            routes = eval(req.responseText);
            populateRoutes();
        }
    }
    req.send();
}

function makeRouteUrl(url, routeId) {
    return url.replace('<routeId>', routeId);
}

function populateRoutes() {
    let e = document.getElementById("mainContainer");

    routes.forEach((v, i, a) => {
        var div = document.createElement("div");
        div.className = "col";
        div.innerText = v["Route Name"];

        e.appendChild(div);
    });
}
