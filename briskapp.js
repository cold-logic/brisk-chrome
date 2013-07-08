angular.module('briskChromeExtension', ['palette'])
  .controller('MainCtrl', function($scope, paletteService, $timeout) {

    var commands = [
      {
        name: "Google",
        cmd: 'extLink',
        data: 'https://google.com'
      },
      {
        name: "Reddit",
        cmd: 'extLink',
        data: 'http://reddit.com'
      }
    ];

    var links = document.getElementsByTagName('a');
    for(var i = 0, l = links.length ; i < l ; i++){
      if(links[i].textContent !== ''){
        commands.push({
          name: 'GOTO: ' + links[i].textContent,
          cmd: 'extLink',
          data: links[i].href
        });
      }
    }

    chrome.runtime.sendMessage({command: "getBookmarks"}, function (bookmarks) {
      console.log(commands.length);
      commands.push.apply(commands, bookmarks);
      console.log(commands.length);
      paletteService.exportCommands(commands);
    });
  });