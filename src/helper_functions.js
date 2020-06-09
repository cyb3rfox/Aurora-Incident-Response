/**
 *
 * Opens a web url in an external browser window rather than in the electron app.
 * @param {string} url - url to open in external browser windows
 */
browser_open =function(url){
    const { shell } = require('electron')
    shell.openExternal(url)
}

