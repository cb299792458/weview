import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";

export const VideoPlayer = props => {
  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(null);
  const videoSrc = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
  const videoJSOptions = {
    autoplay: "muted",
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2]
  };

  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(videoSrc);
        player.on("ended", () => {
          console.log("ended");
        });
        player.on("timeupdate", () => {
          setCurrentTime(player.currentTime());
        });
        console.log("Player Ready");
      });
    }

    return () => {};
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js"
      />
      <span>Current Time: {currentTime}</span>
      {/* <GlobalStyle /> */}
    </div>
  );
};
