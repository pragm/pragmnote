pragm note
====
pragm is a Open Source multiuser Scratchpad. Check out the <a href="http://demo.pragm.de/">Demo</a>

Pull requests are welcome

## Features/Already Done/Current Siutation:

- Pragm is a RichText.editor which has a (currently) simple file-explorer
- Pragm is built up a node.js WebSocket server which synchronizes documents to the Editor in realtime
- Because each key event/input gets synchronizes immediately the web application produces a huge amount of traffic.
- To adress this problem  Pragm contains a differential algorithm which resulted in a siginificant decrease of traffic produced by the synchronization. The Synchronization has a currently very high efficency and needs currently less traffic than Google Docs.

## Ideas for future:

- Expand the editor with drawing functions, math formulas, ... and whatever you can imagine and code
- Build a bigger functionality to explore files and edit user settings
- Show which user edits which element
- (maybe … at some point in the future) Add more editors (presentation, spreadsheet, etc.)

Actually the "sync engine" runs pretty good and is flexible to add more and more functions to pragm. Also it is possible to use the basis of pragm to create a new completely different web application.

Furthermore I plan to build a js-library for differential realtime synchronization.

## How to start a quick Demo:
 - install node.js
 - in the first line of bin/server/serverBuild.js you can change the server-port
 - run bin/server/serverBuild.js with node in the same directory (the scirpt needs to find data/)
 > Command: .../bin/server/>node serverBuild.js
 - open bin/client/index.html with Google Chrome (Safari should work too, is behaving strange sometimes, but most of the time it behaves right.)
  

<table>
  <tr>
    <th>Username</th><th>Password</th>
  </tr>
  <tr>
    <td>Bob</td><td>123</td>
  </tr>
  <tr>
    <td>System</td><td>boss</td>
  </tr>
</table>
 
## Website:

http://www.pragm.de/
