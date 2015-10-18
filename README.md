# quicksubs

This is a hack to quickly add subtitles to a page via a bookmarklet.

For testing using a local server creating a bookmarklet like this worked for me:

    javascript:(function(s){s.src='http://127.0.0.1:8887/cygwin64/home/kai/github/quicksubs/subs.js';document.body.appendChild(s)})(document.createElement('script'))

Clicking this bookmarklet on most pages positions a subtitles box at the top of the window. 

You can use up/down arrow keys to cycle through the subtitles.

This way someone can manually show subtitles in the absence of timecode info.

You can see it work without installing the bookmarklet here:

http://htmlpreview.github.io/?https://github.com/kaicarver/quicksubs/blob/master/index.html
