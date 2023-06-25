let factory_instance = null;

class Factory{

    constructor() {
        if (factory_instance == null) {
            factory_instance = this
        } 
        return this
    }

    // generate_system(x, y, name, id, info=null) {
    //     const m = L.marker(
    //         [x, y],
    //         {
    //             icon: this.ss_icon,
    //             title: name
    //         }
    //     )
    //     const popup = `${name} (${x}:${y})<br><button onclick="location.href='/system/${id}'">visit</button>`
    //     m.bindPopup(popup)
    //     m["info"] = info
    //     return m
    // }

    generate_planet(x, y, name, radius) {
        const c = L.circle(
            [x, y], {
                radius: radius
            }
        )
        // x = x.toFixed(2)
        // y = y.toFixed(2)
        return c
    }

    generate_sun(x, y, name, radius) {
        const c = L.circle(
            [x, y], {
                radius: radius,
                fillColor: "yellow",
                color: "yellow"
            }
        )
        return c
    }

    generate_asteroid(x, y, name, radius) {
        const a = L.circle(
            [x, y], {
                radius: radius,
                fillColor: "black",
                color: "black"
            }
        )
        return a
    }

    generate_cloud_gas(x, y, name, radius) {
        const c = L.circle(
            [x, y], {
                radius: radius,
                fillColor: "#808080",
                color: "#808080"
            }
        )
        return c
    }

    // speed: unit per sec
    // generate_ship(x, y, name, speed) {
    //     const popup = `
    //     ${name}
    //     `
    //     const s = L.marker([x, y])
    //     s.speed = speed
    //     s.bindPopup(popup)
    //     s.on("click", new MapManager().click_ship)
    //     return s
    // }

    generate_system(x, y, planet_qtt, name) {
        const sun = this.generate_sun(x,y, name, new MapManager().sun_radius)
        let planets = []
        let asteroids = []
        for (let i = 1; i<=planet_qtt; i++) {
            const dist = new MapManager().distance_from_object_with_orbit(
                new MapManager().sun_radius,
                i,
                new MapManager().orbit_interval_len
            )
            // Define a random angle
            // determine the target position from the center of the system (sun)
            // at a distance dist using generated angle
            let angle = Math.random()*Math.PI*2
            let px = Math.cos(angle)*dist + x
            let py = Math.sin(angle)*dist + y
            let p = new Factory().generate_planet(
                px, py, name + "-" + i, new MapManager().planet_radius
            )
            planets.push(p)
            if (Math.random() <= new MapManager().asteroid_probability_arround_planet) {
                let dist = new MapManager().distance_from_object_with_orbit(
                    new MapManager().planet_radius,
                    1,
                    new MapManager().asteroid_distance_from_planet
                )
                let angle = Math.random()*Math.PI*2
                let ax = Math.cos(angle) * dist + px
                let ay = Math.sin(angle) * dist + py
                let a = new Factory().generate_asteroid(
                    ax, ay, name +"-a-", new MapManager().asteroid_radius
                )
                asteroids.push(a)
            }
        }
        return {
            'sun': sun,
            'planets': planets,
            "asteroids": asteroids
        }
    }
}
