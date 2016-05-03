/* add subtitles to any HTML page.
Insert into any page using bookmarklet like this:
javascript:(function(s){s.src='http://127.0.0.1:8887/cygwin64/home/kai/github/quicksubs/subs.js?'+Math.random();document.body.appendChild(s)})(document.createElement('script'))
*/
(function () {
"use strict";
var adhoc;
var curLine = 0;
var lines = [];
var boxid = "subtitles_box";
var dialogid = "subtitles_dialog";
  
// use the path of the script we are executing to find other files to read (but can run into Access Origin problem)
var path = document.currentScript.src.replace(/\/[^\/]+$/, '/');

showDialog();

function showDialog() {
  var dialog = getOrCreate(dialogid, 'dialog');
  dialog.returnValue = '';
  dialog.style.textAlign = 'center';
  dialog.innerHTML = `Subtitles in <a href="https://matroska.org/technical/specs/subtitles/srt.html" target="_blank">SubRip format</a>
or <a href="http://transcripts.foreverdreaming.org/viewforum.php?f=159&start=200" target="_blank">lines</a>:<br>
<textarea id="text" style="width: 100%" autofocus></textarea><br>
<button id="ok">OK</button><button id="cancel">Cancel</button>`;
  document.querySelector('#ok').onclick = function() {
    document.getElementById(dialogid).close(document.querySelector('#text').value);
  };
  document.querySelector('#cancel').onclick = function() {
    document.getElementById(dialogid).close();
  };
  dialog.addEventListener('close', function() {
    var subtitles = this.returnValue;
    if (subtitles === '') {
      subtitles = getSubtitles();
    }
    showSubtitles(subtitles);
  });
  dialog.showModal();
}
function showSubtitles(subtitles) {
  // ad hoc format: instead of SubRip .srt format, Big Bang Theory scripts, one subtitle per line, surrounded by p tags
  // for now anything that starts with 0 is SubRip format
  adhoc = !/^\s*\d+\s+\d\d:\d\d:\d\d,\d\d\d\s+/.test(subtitles);
  var subsep = "\n\n";
  if (adhoc) {
    subsep = "\n";
  }
  lines = subtitles.split(subsep);
  var box = getOrCreate(boxid, 'div');
  box.style.position = 'fixed';
  box.style.left = 0;
  box.style.right = 0;
  box.style.marginLeft = 'auto';
  box.style.marginRight = 'auto';
  box.style.backgroundColor = 'rgba(253,245,230,0.7)';
  box.style.color = 'black';
  box.style.fontSize = '1.5em';
  box.style.fontFamily = 'Arial';
  box.style.textAlign = 'center';
  box.style.bottom = 0;
  box.style.zIndex = 150;
  nextLine(0);
  document.onkeydown = function(event) {
    switch (event.keyCode) {
    case 37: nextLine(-1);  return false; // ← Left
    case 38: nextLine(-1);  return false; // ↑ Up
    case 39: nextLine(1);   return false; // → Right
    case 40: nextLine(1);   return false; // ↓ Down
    case 33: nextLine(-10); return false; //   PgUp
    case 34: nextLine(10);  return false; //   PgDn
    case 35: nextLine(lines.length - 1, true); return false; // End
    case 36: nextLine(0, true);                return false; // Home
    }
    return true;
  };
}
function nextLine(pos, absolute) {
  var box = document.getElementById(boxid);
  if (absolute) {
    if (pos >= 0 && pos < lines.length) {
      curLine = pos;
    }
  } else {
    if (curLine + pos < 0) {
      curLine = 0;
    } else if (curLine + pos >= lines.length) {
      curLine = lines.length - 1;
    } else {
      curLine += pos;
    }
  }
  var line = lines[curLine];
  var title = (curLine + 1) + ' / ' + lines.length;
  var text;
  if (adhoc) {
    text = line.replace(/<.*?>/g, '');
  } else {
    var regexp = /^\s*(\d+)\s+(\d+:\d+:\d+,\d+).*?(\d+:\d+:\d+,\d+)\s+([\s\S]+)/;
    var match = regexp.exec(line);
    title = title + "\n" + match[2] + ' - ' + match[3];
    text = match[4];
    text = text.replace(/\n/g, '<br>');
  }
  box.innerHTML = '<span title="' + title + '">' + text + '</span>';
}
function getOrCreate(id, tagName) {
  var e = document.getElementById(id);
  if (e === null) {
    e = document.createElement(tagName);
    e.id = id;
  }
  document.body.appendChild(e);
  return e;
}
function getSubtitles() {
  var req = new XMLHttpRequest();
  // should use other method, synchronous request is deprecated
  req.open('GET', path + 'sevensamurai.srt', false);
  req.send(null);
  return req.responseText;
}
function multiline(f) {
  return f.toString().split('\n').slice(1, -1).join('\n');
}
})();
