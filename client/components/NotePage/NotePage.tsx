import React, { useEffect, useState } from "react";
import VideoSection from "./VideoSection";
import SideBar from "./SideBar";
import NavBar from "../Global/NavBar";
import YouTube, {
  YouTubePlayer,
  YouTubeEvent,
  YouTubeProps,
} from "react-youtube";
import getYouTubeID from "get-youtube-id";
import HomepageContainer from "../../containers/HomepageContainer";
import Login from "../../containers/Login";
import { Route, Routes } from 'react-router-dom'

export default function NotePage() {
  // State for testing - can delete if needed
  const [videoObject, setVideoObject] = useState<YouTubePlayer>();
  const [time, setTime] = useState(0);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [linkInputted, setLinkInputted] = useState(false);
  const [title, setTitle] = useState("");
  const [noteSummary, setNoteSummary] = useState([]);
  const [view, setView] = useState('HomePage')
  const [youtubeVid, setYoutubeVid] = useState('')

  
  useEffect(() => {
    // fetch data from database
  });

  // any time there is a change in state (press play/pause), current time is aquired
  const onPlayerStateChange: YouTubeProps["onStateChange"] = (
    e: YouTubeEvent<number>
  ) => {
    console.log("on player State change triggered")
    console.log(e);

  };

  // once video loads, function fires and video is automatically paused for user to press play
  const onPlayerReady: YouTubeProps["onReady"] = (e) => {
    // set target state to player obj (use for pause button)
    setVideoObject(e.target);
    e.target.pauseVideo();
  };

  

  const handleInputChange = (val: string) => {
    setYoutubeLink(val);
    setId(getYouTubeID(val));
    setLinkInputted(true);
    fetch(`/api/notes/1/${getYouTubeID(val)}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data.notes);
        setNoteSummary(data.notes);
      })
      .catch((err: object) => {
        console.log('Error:', err);
      })
  };

  const getSpecificVideos = (val: string) => {
    setYoutubeLink(`https://www.youtube.com/watch?v=${val}`);
    
    fetch(`/api/notes/1/${val}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data.notes);
        setNoteSummary(data.notes);
      })
      .catch((err: object) => {
        console.log('Error:', err);
      })
  }
  // handles note button pause, sets time stamp in state
  const handleNoteInput = (val: string) => {
    if (!videoObject) return console.error("Target does not exist");
    videoObject.pauseVideo();
    setTime(Math.round(videoObject.getCurrentTime()));
    console.log(time);
    /*if (time === 0) {
      setTime(Math.round(videoObject.getCurrentTime()));
    }
    */
    setContent(val);
  };


   /* Added Code JPA Adds Refresh of Video w/ Timestamp functionality */
   const updateYoutubeLink = (val: string, time: number) => {
    console.log('val from updateYoutube Link:')
    setId(val)
    setTime(time);
    videoObject.seekTo(time)
    videoObject.playVideo();
  }

  

  const handleNoteSummary = (val: Array<{}>) => {
    setNoteSummary((prevState) => [...prevState, val]);
  }

  const handleTitle = (val: string) => {
    setTitle(val);
  }

  const deleteNoteHandler = (note_id: string, user_id: number, youtubeId: string ) => {
    console.log("delete called", note_id, user_id, youtubeId );
    fetch('/api/notes/deleteNotes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({note_id, user_id, youtubeId})})
      .then(response => response.json())
      .then((data) => {
        console.log(data)
          
        /* Now Do another call to server to get updated data */
          fetch(`/api/notes/1/${getYouTubeID(youtubeId)}`)
          .then(response => response.json())
          .then((data) => {
            console.log(data.notes);
            setNoteSummary(data.notes);
          })
          .catch((err: object) => {
            console.log('Error:', err);
          })
       
      })
      .catch((err: {}) => 
        console.log('Error:', err));
      }

  return (
    <>
      <section>
      <NavBar />
      <Routes>
        <Route path= "/login" element={<Login/>} />
        <Route path="/" element={<HomepageContainer setId={setId} getSpecificVideos={getSpecificVideos}/>} />
        <Route path="/notepage" element={ 
        <>
        <VideoSection
            onPlayerReady={onPlayerReady}
            onPlayerStateChange={onPlayerStateChange}
            handleInputChange={handleInputChange}
            id={id}
            linkInputted={linkInputted}
            noteSummary={noteSummary}
            time= {time}
          />
          {console.log(id)}
          <SideBar
            handleNoteInput={handleNoteInput}
            youtubeLink={youtubeLink}
            time={time}
            content={content}
            title={title}
            noteSummary={noteSummary}
            handleNoteSummary={handleNoteSummary}
            handleTitle={handleTitle}
            deleteNoteHandler={deleteNoteHandler}
            updateYoutubeLink = {updateYoutubeLink}
            id={id}
          />
          </>} />
      </Routes>

      
    </section>
    </>
  );
}
