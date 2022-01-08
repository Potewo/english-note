import App from './App.svelte'
import "../loaduikit.scss"
import "../node_modules/uikit/dist/js/uikit.min.js"
import "../node_modules/uikit/dist/js/uikit-icons.min.js"

const app = new App({
  target: document.getElementById('app')
})

export default app
