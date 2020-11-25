import * as PIXI from 'pixi.js'
import app from './ClusterApp'

export class Button extends PIXI.Sprite{
    constructor() {
        super(app.loader.resources['startButton'].texture)
        this.anchor.set(0.5)
        this.scale.set(0.1)
        this.x = app.screen.width / 2
        this.y = this.height
        this.interactive = true
        this.on('click', this.clickHandler)
        this.on('clicked', () => this.scale.set(0.1))
        this.cursor = 'pointer'
    }
    clickHandler() {
        this.scale.set(0.095)
        setTimeout(() => {
            this.emit('clicked')
            app.stage.emit('started')
        }, 50)
    }
}
