let panel_instance = null;

class Panel {

    constructor() {
        if (panel_instance == null) {
            panel_instance = this
            this.panel_element = document.getElementById("selection_info")

            this.info_template = "<p><NAME>: <VALUE></p>"
        }
        return panel_instance
    }

    show_info(selected_element) {
        // to define which actions are possible
        // by knowing what object the marker is in
        const element_position = selected_element.getLatLng()
        let element_orbited = null;
        new MapManager().map.eachLayer(function(layer) {
            if (layer instanceof L.Circle) {
                let distance = new MapManager().map.distance(
                    element_position, layer.getLatLng()
                )
                if (distance <= layer.getRadius()) {
                    element_orbited = layer
                    return
                }
            }
        })
        console.log("element orbited", element_orbited)
        Object.getOwnPropertyNames(selected_element.properties).forEach(name => {
            let data = this.info_template.replace("<NAME>", name).replace("<VALUE>", selected_element.properties[name])
            this.panel_element.innerHTML += data
        });
    }
    clear_info() {
        this.panel_element.textContent = ""
    }
}
