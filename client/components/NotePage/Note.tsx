import React, { useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface stateChangeProps {
    title: string,
    time: number,
    content: string,
    _id: number,
    youtube_Link: string,
    deleteNoteHandler: (note_id: string, user_id: number) => any
    updateYoutubeLink: (val: string, time: number) => void
   
}
let contentLabel = "Content";
let modeLabel = "Edit";

export default function Note ({ title, time, content, _id, deleteNoteHandler,  youtube_Link, updateYoutubeLink }: stateChangeProps){
 
  const [hideContent, setHideContent] = useState(true);
  const [editMode, setMode] = useState("Edit");
const showLabel = ()=> {
  console.log("show label called")
    if (contentLabel == "Content")
      contentLabel = "Hide"
    else
      contentLabel = "Content";
    }

  const updateMode = () => 
  { 
    if (editMode == "Edit")
    setMode("Submit");
    else
    setMode("Edit");
  }



  return (
    <section className="individualNote" key={time}>
      <div className="preview" >
        <p> <b>Title:</b> {title}</p>
        <p><b>Time:</b> {Math.floor(time/60)}:{Math.round(time%60).toString().padStart(2,'0')}</p>
        <p> {!hideContent && <div className="content">
        <p><b>Content:</b> {content}</p>
      </div>}</p>
        <Stack direction="row" spacing={2}>
       
            <Button color="primary" onClick={()=>{updateMode()}}>{editMode}</Button>
          
             <Button color="primary" onClick={() => {setHideContent(prev => !prev); showLabel();}}>{contentLabel} 
             </Button>
            
              <Button color="primary" onClick={()=>deleteNoteHandler(_id.toString(), 1)}>Delete
               </Button>
            
              <Button color="secondary" onClick={()=>updateYoutubeLink( youtube_Link.substr( youtube_Link.indexOf("=")+1), time)}>Timestamp
              </Button>
        </Stack>
      </div>
     
    </section>
  )
}