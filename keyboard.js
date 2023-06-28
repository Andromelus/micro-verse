function keydown(event) {
    // s
    if (event.keyCode == 83) {
        map_manager.stop_selected_element()
    }
    // escape
    if (event.keyCode == 27) {
        map_manager.unselect()
    }
}


window.addEventListener("keydown", keydown, false)
