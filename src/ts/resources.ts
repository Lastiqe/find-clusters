import app from "./ClusterApp"
const loader = app.loader

loader.baseUrl = 'src/assets/'
loader.add('startButton', 'start-button.png')
loader.onError.add((error, loader, resource) => {
    console.error('Loaded : ' + loader.progress + '%' + ', name : ' + resource.name + ', url : ' + resource.url)
})
loader.load(() => {
    app.stage.emit("loaded");
});