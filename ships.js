class Ship {
    constructor(
        name,
        freight = 0,
        speed = 10
    ) {
        this.name = name
        this.freight = freight
        this.speed = speed
        this.state = "Idle"
        this.load_speed = 1 // per sec
    }

    stop() {
        new MapManager().stop_selected_element()
    }

    analyse() {
        alert("analyze does nothing yet")
    }

    build() {
        alert("build does nothing yet")
    }

    unload_cargo(quantity, element, to, time) {
        // this.speed = 0
        // this.state = "Transfer cargo to"
    }

    load_cargo(quantity, element, to, from) {
        // this.speed = 0
        // this.state = "Transfer cargo from"
        // const load_time = null;
        // if (this.load_speed >= from.properties.load_speed) {
        //     load_time = this.load_speed * 1000
        // } else {
        //     load_time = from.properties.load_speed * 1000
        // }
        // from.properties.load_cargo_source(quantity, element, to, load_time)
        // setTimeout(() => {
        //     console.log("loading terminated")
        // }, load_time)
    }

    end_load_cargo() {
        // this.speed = this.original_speed
        // this.state = "Idle"
    }
}

class Freighter extends Ship {

}

class Builder extends Ship {

}

class Explorer extends Ship {
    constructor(name, freight = 0, speed = 10) {
        super(name, freight, speed)
        this.freight = 1
        this.speed = speed
        this.original_speed = this.speed
        this.analysis_time = 30 * 1000
        this.ship_type = "Explorer"
    }

    explore() {
        this.speed = 0
        this.state = "Analysis"
        setTimeout(() => {
            this.end_explore()
        }, this.analysis_time)
    }

    end_explore() {
        this.speed = this.original_speed
        this.state = "Idle"
    }
}
