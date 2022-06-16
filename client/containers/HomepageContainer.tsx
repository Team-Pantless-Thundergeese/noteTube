import React, { useState, useEffect } from "react";
import HomepageCard from "../components/HomePage/HomepageCard";
import YouTube, {
    YouTubePlayer,
    YouTubeEvent,
    YouTubeProps,
  } from "react-youtube";
import getYouTubeID from "get-youtube-id";
import NavBar from "../components/Global/NavBar";

interface stateChangeProps {
    setId: (_id: string) => void
}

export default function HomepageContainer({ setId }: stateChangeProps){

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
    const cards = youtubeIdArray.map((_id: string) => <HomepageCard _id={_id} setId={setId}/>)
    return (
        <>
            <div className="card-container">
                {cards}
            </div>
        </>
    )
  }