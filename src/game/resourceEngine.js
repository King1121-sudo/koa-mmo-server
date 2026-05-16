async function gatherResources({

    prisma,

    playerId,

    resourceType,

    amount

}) {

    const player =
        await prisma.player.findUnique({
            where: {
                id: playerId
            }
        });

    let updateData = {};

    if (resourceType === 'wood') {

        updateData.wood =
            player.wood + amount;
    }

    if (resourceType === 'stone') {

        updateData.stone =
            player.stone + amount;
    }

    if (resourceType === 'gold') {

        updateData.gold =
            player.gold + amount;
    }

    if (resourceType === 'food') {

        updateData.food =
            player.food + amount;
    }

    const updated =
        await prisma.player.update({
            where: {
                id: playerId
            },
            data: updateData
        });

    return updated;
}

module.exports = {
    gatherResources
};