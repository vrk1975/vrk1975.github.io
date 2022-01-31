const thumbnailUrl = "https://1967138230.rsc.cdn77.org/routes/<routeId>/video/thumbnail_313x147.png";
const elevationUrl = "https://1967138230.rsc.cdn77.org/routes/<routeId>/profile/profile_313x147_transparent.png";
const routeUrl = "https://my.rouvy.com/virtual-routes/detail/<routeId>";

var routes;

window.onload = function () {
    let req = new XMLHttpRequest();
    req.open("get", "routes.json");
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

let routeHtml =
    '<div class="content">'+
    '    <div class="header">' +
    '        <img class="profile" />' +
    '    </div>' +
    '    <div class="info">' +
    '        <h5>' +
    '            <a class="routeLink streched-link">' +
    '            </a>' +
    '        </h5>' +
    '        <div class="container-fluid">' +
    '            <div class="properties row">' +
    '            </div>' +
    '        </div>' +
    '    </div>'
    '</div>';

var authors = {};
var countries = {};

function populateRoutes() {
    let e = document.getElementById("mainContainer");

    routes.forEach((v, i, a) => {
        let div = document.createElement("div");

        div.innerHTML = routeHtml;

        div.className = "col-12 col-sm-6 col-md-4";

        div = e.appendChild(div);

        let id = v.GID.slice(- 5);

        div.id = "_r" + v["No"];

        // Header
        let img = div.querySelectorAll(":scope .profile")[0];
        img.src = makeRouteUrl(elevationUrl, id);
        img.alt = id;

        let header = div.querySelectorAll(":scope .header")[0];
        header.style.backgroundImage = "url(" + makeRouteUrl(thumbnailUrl, id) + ")";

        let rl = div.querySelectorAll(":scope .routeLink")[0];
        rl.href = v.GID;
        rl.innerText = v["Route Name"];

        v.Distance = v["L (km)"] + " km";
        v.Ascent = v["+h (m)"] + " m";
        v.Descent = v["-h (m)"] + " m";
        v["Max Grade"] = v["max %"] + ' %';

        let props = div.querySelectorAll(":scope .properties")[0];

        let propLabels = ["Creator", "Country", "Distance", "Ride with", "Ascent", "Descent", "Max Grade"];

        authors[v["Creator"]] = "";
        countries[v["Country"]] = "";

        propLabels.forEach((pn) => {
            let name = document.createElement("div");
            name.className = "name col-6";
            name.innerText = pn;
            props.appendChild(name);

            let val = document.createElement("div");
            val.className = "value col-6";
            val.innerText = v[pn];
            props.appendChild(val);

        });
    });

    let al = document.getElementById("author");

    for (var n in authors) {
        let o = document.createElement("option");
        o.text = n;
        o.value = n;

        al.add(o);
    }

    al.addEventListener("change", () => {
        filter();
    });

    let cl = document.getElementById("country");

    for (var n in countries) {
        let o = document.createElement("option");
        o.text = n;
        o.value = n;

        cl.add(o);
    }

    cl.addEventListener("change", () => {
        filter();
    });

    let rl = document.getElementById("rideWith");

    rl.addEventListener("change", () => {
        filter();
    });
}

function filter() {
    let country = document.getElementById("country").value;
    let rideWith = document.getElementById("rideWith").value;
    let author  = document.getElementById("author").value;


    for (var i = 0; i < routes.length; i++) {
        let r = routes[i];

        let countryOk = country == '--' || r["Country"] == country;
        let rideWithOk = rideWith == '--' || r["Ride with"] == rideWith;
        let authorOk = author == '--' || r["Creator"] == author;

        let show = countryOk && rideWithOk && authorOk;

        document.getElementById("_r" + r.No).style.display = show ? "" : "none";
    }
}

