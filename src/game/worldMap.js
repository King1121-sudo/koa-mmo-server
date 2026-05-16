const mapSize = 100;

const worldMap = [];

for (let y = 0; y < mapSize; y++) {

    let row = [];

    for (let x = 0; x < mapSize; x++) {

        let tileType = 'grass';

        const random = Math.random();

        if (random < 0.05) {
            tileType = 'forest';
        }

        if (random < 0.03) {
            tileType = 'stone';
        }

        if (random < 0.01) {
            tileType = 'gold';
        }

        row.push({
            x,
            y,
            tileType,

        resourceAmount:
           tileType === 'forest' ? 5000 :
           tileType === 'stone' ? 4000 :
           tileType === 'gold' ? 2000 :
           0
        });
    }

    worldMap.push(row);
}

module.exports = worldMap;