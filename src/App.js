import * as React from 'react'
import './App.css';

import { Player, FS_SDK_EVENTS_NAME } from 'furioos-sdk';



function App() {
  const started = React.useRef(false)
  React.useEffect(() => {
    if (started.current) {
      return
    }
    started.current = true // avoid multiple instances
    const options = {
      whiteLabel: true,
      hideToolbar: false,
      hideTitle: true,
      hidePlayButton: true,
    };

    const player = new Player("YeH4YRJKeTvyJyxG9" ,"furioos", options);

// Bind player loaded
    player.on(FS_SDK_EVENTS_NAME.LOAD, function() {
      console.log("SDK client FIRED: Player loaded");
      player.start()
    });

// Bind application install progress
    player.on(FS_SDK_EVENTS_NAME.ON_APP_INSTALL_PROGRESS, function(data) {
      console.log("SDK client FIRED: App install progress", data);
    });

// Bind application start
    player.on(FS_SDK_EVENTS_NAME.ON_APP_START, function() {
      console.log("SDK client FIRED: App start");
    });

// Bind stream start
    player.on(FS_SDK_EVENTS_NAME.ON_STREAM_START, function() {
      console.log("SDK client FIRED: Stream start");
    });

// Bind SDK messages
    player.on(FS_SDK_EVENTS_NAME.ON_SDK_MESSAGE, function(data) {
      console.log("SDK Message Received:", data);
    });

// Bind an event that lets you know if you can resume session
    player.on(FS_SDK_EVENTS_NAME.ON_RESUME_SESSION, function({ canResumeSession }) {
      if(canResumeSession) {
        player.resumeSession();
      }
    });

// Bind session stoppeds
    player.on(FS_SDK_EVENTS_NAME.ON_SESSION_STOPPED, function() {
      console.log("SDK client FIRED: Session Stopped");
    })
  }, [])
  return (
      <div id='furioos' style={{ height: '100vh', width: '100vw'}}></div>
  );
}

export default App;
