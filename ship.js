
let ship_reference = null
class ShipReference{
    constructor() {
        if (ship_reference == null) {
            ship_reference = this
        }
        return ship_reference
    }

    mine() {
        console.log("mine")
    }

    explore() {
        console.log("explore")
    }

}