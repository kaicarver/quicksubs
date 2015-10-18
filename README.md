# quicksubs

This is a proof-of-concept collection of hacks to quickly add subtitles to a page via a bookmarklet.

It can be used with the following bookmarklet:

    javascript:(function(s){s.src='http://rawgit.com/kaicarver/quicksubs/master/subs.js';document.body.appendChild(s)})(document.createElement('script'))

After installing this bookmarklet, on most pages, clicking it positions a subtitles box at the top of the window. 

You can use up/down arrow keys to cycle through the subtitles.

This allows someone to manually show subtitles in the absence of timecode info.

You can see it work without installing the bookmarklet here:

http://htmlpreview.github.io/?https://github.com/kaicarver/quicksubs/blob/master/index.html
