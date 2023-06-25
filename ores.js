
let ore_factory_instance = null
class OreFactory{
    constructor() {
        if (ore_factory_instance == null) {
            ore_factory_instance = this
        }
        return ore_factory_instance
    }

    available_ores = {
        "planets": ["iron"],
        'asteroids': ["iron"]
    }

    get_random_ore(star_type) {
        let ore_qtt = this.available_ores[star_type].length
        let selected = this.available_ores[star_type][
            new Utils().random_float_from_interval(0, ore_qtt - 1)
        ]
        return selected
    }

    get_quantity() {
        return 10000
    }

}