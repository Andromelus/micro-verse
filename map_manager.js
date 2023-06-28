let map_manager = null;

class MapManager {

    constructor() {
        if (map_manager == null) {
            map_manager = this
            this.map = L.map('map', {
                crs: L.CRS.Simple
            });
            var bounds = [[0,0], [1000,1000]];
            L.imageOverlay('empty_map.png', bounds).addTo(this.map);
            this.map.fitBounds(bounds);
            this.map_objects = {
                "stars": {},
                "ships": {}
            }
            this.map.on("click", this.click_map)
            this.map.on("contextmenu", this.context_menu)
        }
        return map_manager
    }

    // ################################################### handle map stuff
    sun_radius = 10
    orbit_interval_len = 5
    asteroid_probability_arround_planet = 0.5
    asteroid_distance_from_planet = 2
    asteroid_radius = 0.1

    planet_radius = 1

    add_to_map(element) {
        element.addTo(map_manager.map)
    }

    /**
     * Given an object representing a system, add to map every
     * element of the system
     * 
     * @param {*} system An object with keys: "sun", "planets" (array), "asteroids" (array)
     */
    add_system_to_map(system) {
        this.add_to_map(system.sun)
        system.planets.forEach(planet => {
            this.add_to_map(planet)
        });
        system.asteroids.forEach(asteroid => {
            this.add_to_map(asteroid)
        });
    }

    calculate_move_duration(src_latLng, dest_LatLng, speed) {
        let d = map_manager.map.distance(
            src_latLng,
            dest_LatLng
        )
        return d / parseFloat(speed)
        
    }

    // calcul distance aléatoire à partir d'un rayon, d'un coef et de la largeur d'une orbite
                    // | ceci * orbit_interval |
    // . --radius--> . --largeur orbite-->
    distance_from_object_with_orbit(source_radius, orbit_interval, orbit_interval_len) {
        let low = source_radius + orbit_interval * orbit_interval_len
        let high = low + orbit_interval_len
        let r = new Utils().random_float_from_interval(low, high)
        return r
    }


    travel_duration(x_origin, y_origin, x_dest, y_dest, speed) {
        let distance = map_manager.map.distance(
            L.latLng(x_origin, y_origin),
            L.latLng(x_dest, y_dest)
        )
        return distance/speed * 1000
    }


    // ################################################### handle context
    selected_element = null
    click_ship(mouse_event) {
        map_manager.selected_element = mouse_event.sourceTarget
    }


    click_map(mouse_event) {
        if (map_manager.selected_element != null) {
            const x = mouse_event.latlng.lat
            const y = mouse_event.latlng.lng
            let duration = map_manager.travel_duration(
                map_manager.selected_element.getLatLng().lat,
                map_manager.selected_element.getLatLng().lng,
                mouse_event.latlng.lat,
                mouse_event.latlng.lng,
                map_manager.selected_element.speed
            )
            map_manager.selected_element.slideTo([x, y], {duration: duration})
            map_manager.selected_element = null
        }
    }

    stop_selected_element() {
        if (map_manager.selected_element != null) {
            map_manager.selected_element.slideCancel()
        }
    }

    unselect() {
        if (new MapManager().selected_element != null) {
            new MapManager().selected_element.closePopup()
        }
        map_manager.selected_element = null
    }

    context_menu(event) {
        new MapManager().unselect()
    }
}

new MapManager()
