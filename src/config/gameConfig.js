const GAME_CONFIG = {

    MAP_SIZE: 100,

    MARCH_SPEED: 2,

    DEFAULT_POWER: 100,

    STARTING_RESOURCES: {

        food: 1000,

        wood: 1000,

        stone: 1000,

        gold: 1000
    },

    TROOP_TYPES: {

        Infantry: {

            attack: 10,

            defense: 10,

            speed: 1
        },

        Cavalry: {

            attack: 15,

            defense: 8,

            speed: 2
        },

        Archer: {

            attack: 12,

            defense: 5,

            speed: 1
        }
    },

    BATTLE: {

        ATTACKER_LOSS_RATE: 0.3,

        DEFENDER_LOSS_RATE: 0.5
    }
};

module.exports = {
    GAME_CONFIG
};