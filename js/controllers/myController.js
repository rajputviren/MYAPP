app.controller("viewDataController", function ($scope, $http, $routeParams) {
    $scope.GetData = [];
    var markers = [],
        itemName = $routeParams.menuName,
        locations = itemName.split(','),
        city = locations[1],
        item = locations[0];

//getting city location and item
    $http({
        method: 'GET',
        url: '/search?location=' + city + '&term=' + item + ''
    }).then(function successCallback(response) {
        var data = response.data.businesses;

        for (i = 0; i < data.length; i++) {
            $scope.GetData.push(
                {
                    id: data[i].id,
                    name: data[i].name,
                    display_phone: (data[i].display_phone == undefined) ? "Not Avaliable" : data[i].display_phone,
                    display_address: data[i].location.display_address,
                    city: data[i].location.city,
                    country_code: data[i].location.country_code,
                    rating: data[i].rating_img_url,
                    image: (data[i].image_url == undefined) ? 'images/empty.png' : data[i].image_url,
                    coordinates: data[i].location.coordinate,
                    url: data[i].url
                }
            );
            //for loading map and markers
            loadMarkers();
        }
    });

    function loadMarkers() {
        var locations = $scope.GetData,
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: new google.maps.LatLng(-33.92, 161.25)
            });

        var infoWindow = new google.maps.InfoWindow(),
            bounds = new google.maps.LatLngBounds(),
            marker, i;

        for (i = 0; i < locations.length; i++) {
            var mapCoordinate = locations[i].coordinates;
            marker = new google.maps.Marker({
                id: locations[i].id,
                position: new google.maps.LatLng(mapCoordinate.latitude, mapCoordinate.longitude),
                map: map
            });

            markers.push(marker);
            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                return function () {
                    infoWindow.setContent('<div class="map-item"><strong><span>' + (i + 1) + '</span>.' +
                        ' ' + locations[i].name + '</strong>' + '<br>' + '&#9990; ' + locations[i].display_phone
                        + '<br>' + locations[i].display_address[0] + '<br>' + locations[i].city + '</div>');
                    infoWindow.open(map, marker);
                }
            })(marker, i));
        }
        map.fitBounds(bounds);
    }
});
