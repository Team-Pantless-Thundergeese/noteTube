import React, { useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface stateChangeProps {
    title: string,
    time: number,
    content: string,
    _id: number,
    youtube_Link: string,
    deleteNoteHandler: (val: number) => any
    updateYoutubeLink: (val: string, time: number) => void
}

export default function Note ({ title, time, content, _id, deleteNoteHandler,  youtube_Link, updateYoutubeLink }: stateChangeProps){
  const [hideContent, setHideContent] = useState(true);

  return (
    <section className="individualNote">
      <div className="preview" onClick={() => setHideContent(prev => !prev)}>
        <p>Title: {title}</p>
        <p>Time: {time}</p>
        <Stack direction="row" spacing={2}>
      <Button color="secondary" onClick={()=>updateYoutubeLink( youtube_Link.substr( youtube_Link.indexOf("=")+1), time)}>Timestamp</Button>
    </Stack>
      </div>
      {!hideContent && <div className="content">
        <p>Content: {content}</p>
        <button onClick={() => deleteNoteHandler(_id)}>Delete</button>
      </div>}
    </section>
  )
}