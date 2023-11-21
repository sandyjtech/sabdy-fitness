import React from "react";

const VideoPlayer = () => {
  return (
    <div className="video-player">
      {/* Embed your video player here */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/your-video-id"
        title="Video Player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;