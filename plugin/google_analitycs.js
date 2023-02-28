export default ({ app}) => {
    if(process.client) {
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5S6JQHZK2H'
        document.head.appendChild(script)
    
        window.dataLayer = window.dataLayer || []
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date())
        gtag('config', 'G-5S6JQHZK2H')
    }
}