let utils_instance = null;

class Utils{
    constructor() {
        if (utils_instance == null) {
            utils_instance = this
        } 
        return this
    }

    plus_or_minus() {
        return Math.random() < 0.5 ? -1 : 1;
    }

    random_float_from_interval(min, max) {
        return Math.random() * (max - min) + min
      }
}
