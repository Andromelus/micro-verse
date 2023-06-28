function keydown(event) {
    // s
    if (event.keyCode == 83) {
        map_manager.stop_selected_element()
    }
    // escape
    else if (event.keyCode == 27) {
        map_manager.unselect()
    }
    else {
        console.log(event.keyCode)
    }
    
}

window.addEventListener("keydown", keydown, false)
