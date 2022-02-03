import App from './App.svelte'
import "../loaduikit.scss"
/* import "uikit/dist/js/uikit.min.js" */
/* import "uikit/dist/js/uikit-icons.min.js" */
import "../node_modules/uikit/dist/js/uikit.js"
import "../node_modules/uikit/dist/js/uikit-icons.js"

const app = new App({
  target: document.getElementById('app')
})

export default app
