import React, { useState, useEffect } from "react";
import HomepageCard from "../components/HomePage/HomepageCard";


export default function HomepageContainer(){

    const [youtubeIdArray, setYoutubeIdArray] = useState([]);

    useEffect(() => {
        fetch('/api/notes/1')
        .then(response => response.json())
        .then((data) => {
          const idData: Array<string> = []
          data.notes.forEach((el: any) => idData.push(el._id))
          setYoutubeIdArray(idData)
        })
        .catch((err: object) => {
          console.log('Error:', err);
        })
    }, [])
    console.log(youtubeIdArray)
    const cards = youtubeIdArray.map((_id: string) => <HomepageCard />)
    return (
        <>
            <div className="card-container">
                {cards}
            </div>
        </>
    )
  }