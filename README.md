note
====
Sync the Web in Realtime

pragm is a Open Source multiuser Scratchpad inspired by Microsoft Onenote®. [Sorry! No online demo right now]

What I have already done:
I built a editor which has a (a the moment) simple file-explorer
I built up a node.js WebSocket server which synchronizes documents to the editor in realtime
Because of each key input synchronizes immediately the web application produces a huge amount of traffic.
To reduce this I created a differential algorithm
Now I am happy to say that my synchronization needs less traffic than Google Docs

Ideas for future:
Expand the editor with drawing functions, math formulas, ... and whatever you can imagine and code
Build a bigger functionality to explore files and edit user settings
Show which user edits which element
Sometime: Add more editors (presentation, spreadsheet, etc.)

Actually the "sync engine" runs pretty good and is flexible to add more and more functions to pragm. Also it is possible to use the basis of pragm to create a new completely different web application.

Furthermore I plan to build a js-library for differential realtime synchronization.

You want to get involved?
You are very Welcome! :) Please contact me on GitHub.
