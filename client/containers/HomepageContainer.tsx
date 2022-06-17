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
import { ClassNames } from "@emotion/react";

interface stateChangeProps {
    setId: (_id: string) => void
    getSpecificVideos: (val: string) => void
    
}
const submitRecord = (e: any) => {
  console.log("Submit Record Invoked")
  console.log(e.target.value)
  const body = {
    title: "New Record" ,
    content: " ",
    youtubeLink: e.target.value,
    time: 0,
  };
  console.log(body);
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  fetch("/api/notes/", request)
    .then((response) => response.json())
    .then((data) => {
     console.log(data);
    


    })
    .catch((err) => {
      console.log(err);
    });
    }
export default function HomepageContainer({ setId, getSpecificVideos }: stateChangeProps){

    const [youtubeIdArray, setYoutubeIdArray] = useState([]);
    const [youtubeValue, setYoutubeValue] = useState("");
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        fetch('/api/notes/1')
        .then(response => response.json())
        .then((data) => {
          const idData: Array<string> = []
          console.log('note', data.notes)
          data.notes.forEach((el: any) => idData.push(`${getYouTubeID(el.youtube_link)}`))
          setYoutubeIdArray(idData)
        })
        .catch((err: object) => {
          console.log('Error:', err);
        })
    }, [youtubeIdArray])
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
                <TextField onChange={(e)=> submitRecord(e)} fullWidth label="paste a url" id="fullWidth" />
                {/* <button onClick={}>Submit</button> */}
            </Box>
            <div className="card-container">
                {cards}
            </div>
        </>
    )
  }