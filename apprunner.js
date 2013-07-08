// console.log(chrome.bookmarks);
var injectedApp = document.createElement('div');
injectedApp.innerHTML = '<div style="padding:0;margin:0;" ng-controller="MainCtrl"><palette></palette></div>';
document.body.insertBefore(injectedApp, document.body.firstChild);
angular.bootstrap(injectedApp, ['briskChromeExtension']);
