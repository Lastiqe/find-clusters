import * as PIXI from 'pixi.js'
export class Icon extends PIXI.Graphics {
    private color: number
    private iconSize: number
    private colorizeDelay: number
    private markDelay: number
    private posX: number
    private posY: number
    private marked: boolean
    constructor(
        posX: number,
        posY: number,
        color: number,
        marked: boolean,
        iconSize: number,
        colorizeDelay: number,
        markDelay: number) {

        super()
        this.color = color
        this.iconSize = iconSize
        this.colorizeDelay = colorizeDelay
        this.markDelay = markDelay
        this.posX = posX
        this.posY = posY
        this.marked = marked

        this.lineStyle(1, 0x000)
        this.beginFill(0xffffff)
        this.drawRect(0, 0, this.iconSize, this.iconSize)
        this.endFill()
        this.x = this.posX
        this.y = this.posY

    }
    public colorize(): void {
        setTimeout(() => {
            this.clear()
            this.lineStyle(1, 0x000)
            this.beginFill(this.color)
            this.drawRect(0, 0, this.iconSize, this.iconSize)
            this.endFill()
            this.x = this.posX
            this.y = this.posY
        }, this.colorizeDelay)
    }
    public mark(): void {
        setTimeout(() => {
            if (this.marked) {
                const text = new PIXI.Sprite().addChild(new PIXI.Text('!'))
                this.addChild(text)
                text.anchor.set(0.5)
                text.position.x = this.iconSize / 2 + 0.5
                text.position.y = this.iconSize / 2
            }
        }, this.markDelay)

    }

}