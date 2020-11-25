import * as PIXI from 'pixi.js'
import app from './ClusterApp'
import { Icon } from './Icon'
import { findCurrentCluster } from './utills'

export type TCoordinate = {
    x: number,
    y: number,
    color?: number
}


export class Field extends PIXI.Container{
    private iconsArr: number[][] = []
    private clusterArr: TCoordinate[][] = []
    private isStarted: boolean = false
    private green = 0xcc31
    private red = 0xE22C2F
    private blue = 0x4a6bfd
    private yellow = 0xFCFF00
    private orange = 0xfc9d03
    private posX =  app.screen.width / 2
    private posY = 80
    private iconSize = 32

    constructor(colsCount: number, rowsCount: number) {
        super()
        this.x = this.posX - colsCount * this.iconSize / 2
        this.y = this.posY
        this.iconsArr = this.iconsGenerate(colsCount, rowsCount)
        this.fill()
        app.stage.on('started', () => {
            this.removeChildren()
            this.fill()
            this.isStarted = true
            this.iconsArr = this.iconsGenerate(colsCount, rowsCount)
            this.clusterArr = this.findClusters()     
            this.fill()
        })
    }

    private iconsGenerate(width: number, height: number): number[][] {
        const fieldsArr: number[][] = []
        for (let i = 0; i < height; i++) {
            const tempArr: number[] = []
            for (let j = 0; j < width; j++) {
                const color = this.randomInteger(1, 5)
                switch (color) {
                    case 1: tempArr.push(this.green)
                        break
                    case 2: tempArr.push(this.red)
                        break
                    case 3: tempArr.push(this.blue)
                        break
                    case 4: tempArr.push(this.yellow)
                        break
                    case 5: tempArr.push(this.orange)
                        break
                    default: break
                }
            }
            fieldsArr.push(tempArr)
        }
        return fieldsArr
    }

    private fill(): void {
        let posX = 0
        let posY = 0
        let colorizeDelay = 0
        let markDelay = 0
        this.iconsArr.map((row: number[], rowIndex: number) => {
            if (rowIndex !== 0) posY += this.iconSize
            row.map((color: number, index: number) => {
                let marked = false

                this.clusterArr.map((item1: any) => {
                    item1.map((item: any) => {
                        if (item.x === index && item.y === rowIndex) marked = true
                    })
                })
                posX = index * this.iconSize
                markDelay = this.iconsArr.length * row.length * 5 + colorizeDelay
                const icon = new Icon(posX, posY, color, marked, this.iconSize, colorizeDelay, markDelay)

                if (this.isStarted) {
                    icon.colorize()
                    icon.mark()
                }
                this.addChild(icon)
                colorizeDelay += 5
            })

        })
    }

    private findClusters(): TCoordinate[][] {
        const iconsArrCopy: number[][] = []
        const cluster: TCoordinate[][] = []

        this.iconsArr.map((row: number[]) => {
            iconsArrCopy.push(row.slice())
        })

        iconsArrCopy.map((row: number[], posY: number) => {
            row.map((color: number, posX: number) => {
                if (color !== -1) {
                    const tmpCluster = findCurrentCluster(posX, posY, iconsArrCopy)
                    if (tmpCluster.length > 2) cluster.push(tmpCluster)
                }
            })
        })

        return cluster
    }

    public randomInteger(min: number, max: number): number {
        let rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
    }
}


