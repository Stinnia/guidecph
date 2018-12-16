function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("googlemap");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    } else {
        mapdiv.style.width = '600px';
        mapdiv.style.height = '800px';
    }
}

var myLatLng;
var latit;
var longit;

function geoSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapProp = {
        center: myLatLng,
        // mapTypeId: google.maps.MapTypeId.ROADMAP,// puts your current location at the centre of the map,
        zoom: 15,
        center: { lat: 55.6834142, lng: 12.5717939 },
        mapTypeId: 'roadmap',
        gestureHandling: "greedy",
        streetViewControl: true,

    };

    var map = new google.maps.Map(document.getElementById("googlemap"), mapProp);

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    //call renderer to display directions
    directionsDisplay.setMap(map);
    var bounds = new google.maps.LatLngBounds();
    // Multiple Markers
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'My location',
    });
    var markers = [
        ['Buddhist center', 55.7224902, 12.5745584],
        ['Nørreport', 55.6833363, 12.5713741],
        ['The Inner Universe Exhibition', 55.6811446, 12.5767045],
        ['The first Buddhist Center', 55.6808332, 12.5761832],
        ['Academic Danish Boxing Club', 55.6794151, 12.5740742],
        ['Univercity of Copenhagen', 55.6796228, 12.5724739],
        ['Lama Ole & Bjørns old apartment', 55.6806077, 12.5725484],
        ['Højbro Bridge', 55.6775811, 12.5798908],
        ['Café Nick', 55.6781086, 12.5823181],
        ['Hong Kong Bar', 55.6806652, 12.5885748],
        ['Odd Fellow Palæ', 55.68266172, 12.5893004],
        ['Vor Frelsers Kirke', 55.6728411, 12.5936429],
        ['my current location', latitude, longitude]
    ];
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
            '<p>' + markers[0][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[1][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[2][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[3][0] + '</h4>' +
            '</div>'
        ],

        ['<div class="info_content">' +
            '<p>' + markers[4][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[5][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[6][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[7][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[8][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[9][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[10][0] + '</h4>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<p>' + markers[11][0] + '</h4>' +
            '</div>'
        ]
    ];
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(),
        marker, i;
    // Loop through our array of markers & place each one on the map
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
                latit = marker.getPosition().lat();
                longit = marker.getPosition().lng();
                // console.log("lat: " + latit);
                // console.log("lng: " + longit);
            }
        })(marker, i));
        marker.addListener('click', function() {
            directionsService.route({
                // origin: document.getElementById('start').value,
                origin: myLatLng,
                // destination: marker.getPosition(),
                destination: {
                    lat: latit,
                    lng: longit
                },
                travelMode: 'WALKING'
            }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        });
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
}

function geoError() {
    alert("Geocoder failed.");
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        // alert("Geolocation is supported by this browser.");
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fail() {
    alert('navigator.geolocation failed, may not be supported');
}