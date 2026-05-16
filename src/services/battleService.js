const {

    GAME_CONFIG

} = require('../config/gameConfig');

async function calculateBattle({

    attackerPower,

    defenderPower

}) {

    let winner;

    if (
        attackerPower >
        defenderPower
    ) {

        winner = 'attacker';

    } else {

        winner = 'defender';
    }

    const attackerLosses =
        Math.floor(

            attackerPower *

            GAME_CONFIG.BATTLE
            .ATTACKER_LOSS_RATE
        );

    const defenderLosses =
        Math.floor(

            defenderPower *

            GAME_CONFIG.BATTLE
            .DEFENDER_LOSS_RATE
        );

    return {

        winner,

        attackerLosses,

        defenderLosses
    };
}

module.exports = {
    calculateBattle
};