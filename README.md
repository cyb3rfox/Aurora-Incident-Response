# 1 Aurora Incident Response

Incident Response Documentation made easy. Developed by Incident Responders for Incident Responders.
Aurora brings "Spreadsheet of Doom" used in the SANS FOR508 class to the next level. 


## 1.1 Download & Installation

You can download the current release of Aurora Incident Response from the Release Page.
Aurora Incident Response is available for MacOS, Windows and Linux. We are working on making it available for
iPads and Android Tablets as well.

## 1.2 Developement

If you want to contribute, you are encouraged to do so. I'd totally like to see the tool growing. 
The whole application is build on an electron base and written in plain javascript and html.
Even though technically I could have used node.js modules for functionality like webdav I refrained from it.
The reason is, that node modules will not run out of the box when migrating the code to phonegap for IOS and Android.
The good news is, it's really fast to set uo your development environment. I personally use Webstorm but it should work with pretty much any IDE.

### 1.2.1 Set up your build environment

As pointed out in the description, Aurora Incident Response is built ib top of Electron which allows for multi platform compatibility.
You can easily install your tool chain the following way.

Start by installing node.js. Follow the links to their download page.

https://nodejs.org/en/download/

With nodejs installed, checkout the Aurora github repo (or fork first if you want to contribute).

<code>git clone https://github.com/cyb3rfox/Aurora-Incident-Response </code>

<code>cd Aurora-Incident-Response/src
</code>


Now you need to install electron using node. Currently Aurora is configured to run with electron 4.0.6. 

<code>npm install electron@4.0.6 </code>

You can now run the code by invoking

<code>node_modules/.bin/electron .</code>

That's fast, isn't it?

### 1.2.2 Roadmap

The following points are already on the roadmap. Please just post a new issue or send a message on twitter if you got any suggestions for new improvements.

* Add Webdav capability for easier sharing (Currently multiuser mode uses shares) &#128679;
* Add csv import and export functionality with custom field mapping
* Create a tablet version (only makes sense once webdav works)
* Reporting System to export prefilled report templates (requires adding killchain stage to timeline elements)


### 1.2.3 Build executables for distribution

To build and cross build you I use electron-packager. 
<code>npm install electron-packager</code>

Build for Windows:

<code>./node_modules/.bin/electron-packager . Aurora --asar --prune --platform=win32 --electron-version=4.0.6 --arch=x64 --icon=icon/aurora.ico --out=release-builds --ignore "node_modules/\.bin" </code>

Build for MacOS:

<code>./node_modules/.bin/electron-packager ./src Aurora --overwrite --platform=darwin --arch=x64 --icon=icon/aurora.icns --prune=true --out=release-builds </code>

Build for Linux:

<code>./node_modules/.bin/electron-packager . Aurora --asar --prune --platform=linux --electron-version=4.0.6 --arch=x64 --icon=icon/aurora.ico --out=release-builds --ignore "node_modules/\.bin" </code>

### 1.2.4 Sourcecode Navigator

This section describes the various sourcecode files.

## 1.3 Licensing

Aurora is licensed under the Apache 2 License

## 1.4 Credits


