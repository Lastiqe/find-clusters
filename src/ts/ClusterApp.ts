import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { Field } from './Field';

class ClusterApp extends PIXI.Application {
    constructor() {
        super({
            width: window.innerWidth,
            backgroundColor: 0xffffff
        })
        document.body.appendChild(this.view)

        this.stage.on('loaded', () => {
            this.stage.addChild(new Button())
            this.stage.addChild(new Field(20, 15))
        })
        
    }
}
const app = new ClusterApp()
export default app
