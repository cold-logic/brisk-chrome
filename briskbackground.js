var bookmarkCmds = [];

function getBookmarks (bookmarkNode) {
  if(bookmarkNode.hasOwnProperty('children')) {
    for(var i = 0, l = bookmarkNode.children.length ; i < l ; i++){
      getBookmarks(bookmarkNode.children[i]);
    }
  }
  else {
    if(bookmarkNode.hasOwnProperty('url')) {
      bookmarkCmds.push({
        name: 'Bookmark: ' + bookmarkNode.title,
        cmd: 'extLink',
        data: bookmarkNode.url
      });
    }
  }
}

chrome.bookmarks.getTree(function(bookmarks){
  console.log('getting bookmarks');
  getBookmarks(bookmarks[0]);
  console.log(bookmarkCmds);
});

chrome.runtime.onMessage.addListener(
  function(req, sender, sendResponse) {
    if(req.command === 'getBookmarks'){
      sendResponse(bookmarkCmds);
    }
});