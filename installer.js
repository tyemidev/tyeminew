var installer = filename => {
    let pwapath = `./app/${filename}.html`
    fetch(pwapath).then(response => response.text()).then(html => {
        // parse doc
        let doc = new DOMParser().parseFromString(html, 'text/html')

        // stylesheets
        let stylesheets = doc.querySelectorAll('link[rel=stylesheet]')
        for(let i = 0; i < stylesheets.length; i++){
            let style = stylesheets[i]
            fetch(style.href).then(response => response.text()).then(css => {
                style.insertAdjacentHTML('beforebegin', `<style>${css}</style>`)
                style.remove()
            })
        };

        // scripts
        let scripts = doc.querySelectorAll('script[src]')
        for(let i = 0; i < scripts.length; i++){
            let script = scripts[i]
            fetch(script.href).then(response => response.text()).then(js => {
                script.insertAdjacentHTML('beforebegin', `<script>${js}</script>`)
                script.remove()
            })
        };
        console.log(doc)

        // window
        let app = window.open('http://example.com/')
        app.window.parent = undefined
        app.document.head.innerHTML = doc.head.innerHTML
        app.document.body.innerHTML = doc.body.innerHTML
    })
    .catch(e=>{
        console.error(e)
    })
}