import { TCoordinate } from "./Field"

export function findCurrentCluster(posX: number, posY: number, iconsArrCopy: number[][]) {
    const tmpCluster: TCoordinate[] = []

    function findNearbyEl(posX: number, posY: number, tmpCluster: TCoordinate[] = []): TCoordinate[] {
        const color = iconsArrCopy[posY][posX]
        const ways = findPossiblesWays(posX, posY, color)
        iconsArrCopy[posY][posX] = -1
        tmpCluster.push({ x: posX, y: posY, color })
        if (ways.length > 0) {
            for (let i = 0; i < ways.length; i++) {
                const currentWay = ways[i]
                if (iconsArrCopy[currentWay.y][currentWay.x] !== -1) {
                    findNearbyEl(currentWay.x, currentWay.y, tmpCluster)
                }
            }
        }
        return tmpCluster
    }

    function findPossiblesWays(posX: number, posY: number, color: number): TCoordinate[] {
        const ways: TCoordinate[] = []
        const rightCube = iconsArrCopy[posY][posX + 1]
        const leftCube = iconsArrCopy[posY][posX - 1]
        const lowerCube = iconsArrCopy[posY + 1] ? iconsArrCopy[posY + 1][posX] : undefined
        const upperCube = iconsArrCopy[posY - 1] ? iconsArrCopy[posY - 1][posX] : undefined
       
        if (rightCube === color) {
            ways.push({ x: posX + 1, y: posY })
        }
        if (leftCube === color) {
            ways.push({ x: posX - 1, y: posY })
        }
        if (lowerCube === color) {
            ways.push({ x: posX, y: posY + 1 })
        }
        if (upperCube === color) {
            ways.push({ x: posX, y: posY - 1 })
        }
        return ways
    }

    return findNearbyEl(posX, posY, tmpCluster)
}
