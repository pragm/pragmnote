pragm note
====
pragm is a Open Source multiuser Scratchpad. Check out the <a href="http://demo.pragm.de/">Demo</a>

Pull requests are appreciated and welcomed.

## Features/Already Done/Current Siutation:

- I built a RichText.editor which has a (currently) simple file-explorer
- I built up a node.js WebSocket server which synchronizes documents to the Editor in realtime
- Because each key event/input gets synchronized immediately the web application produces a huge amount of traffic.
- To address this problem I created a differential algorithm which resulted in a siginificant decrease in traffic produced by the synchronization. The synchronization has very high efficency currently and needs sufficiently less traffic than Google Docs at this time.

## Ideas for future:

- Expand the editor with drawing functions, math formulas, etc. and whatever you can imagine and code
- Build in bigger functionality to explore files and edit user settings
- Display which user has edited which element
- (maybe at some point in the future) Add more editors (presentation, spreadsheet, etc.)

Actually the "sync engine" runs pretty well, and is flexible to add more and more functions to pragm. Also it is possible to use the basis of pragm to create a new, completely different web application.

Furthermore I plan to build a js-library for differential realtime synchronization.

## How to start a quick demo:
 - install node.js
 - in the first line of bin/server/serverBuild.js, you can change the server-port.
 - run bin/server/serverBuild.js with node in the same directory (the script needs to find data/)
 > Command: .../bin/server/>node serverBuild.js
 - open bin/client/index.html with Google Chrome - Safari should work too, however at times it behaves strangely, but most of the time it behaves correctly.
  

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
 
## Known Bugs:
Usage of websockets results in problems with usage of pragm behind http proxys like squid.
## Website:

http://www.pragm.de/
