import React, { useState, useEffect } from "react";
import HomepageCard from "../components/HomePage/HomepageCard";
import YouTube, {
    YouTubePlayer,
    YouTubeEvent,
    YouTubeProps,
  } from "react-youtube";
import getYouTubeID from "get-youtube-id";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface stateChangeProps {
    setId: (_id: string) => void
    getSpecificVideos: (val: string) => void
}

export default function HomepageContainer({ setId, getSpecificVideos }: stateChangeProps){

    const [youtubeIdArray, setYoutubeIdArray] = useState([]);
    

    useEffect(() => {
        fetch('/api/notes/1')
        .then(response => response.json())
        .then((data) => {
          const idData: Array<string> = []
          console.log(data.notes)
          data.notes.forEach((el: any) => idData.push(`${getYouTubeID(el.youtube_link)}`))
          setYoutubeIdArray(idData)
        })
        .catch((err: object) => {
          console.log('Error:', err);
        })
    }, [])
    console.log(youtubeIdArray)
    const cards = youtubeIdArray.map((_id: string) => <HomepageCard _id={_id} setId={setId} getSpecificVideos={getSpecificVideos}/>)
    return (
        <>
            <Box
                className="search-a-video"
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
            >
                <TextField fullWidth label="paste a url" id="fullWidth" />
            </Box>
            <div className="card-container">
                {cards}
            </div>
        </>
    )
  }