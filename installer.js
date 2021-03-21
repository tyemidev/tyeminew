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

        /*// stringification
        let docstr = doc.outerHTML
        console.log(docstr)
        
        // data uri
        let bsf = btoa(docstr)
        let data = `data:text/html;base64,${bsf}`*/

        // window
        let app = window.open()
        app.window.parent = undefined
        app.document = doc
    })
}