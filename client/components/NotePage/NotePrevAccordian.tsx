import React from 'react';
import Note from './Note';

interface stateChangeProps {
    noteSummary: Array<any>,
    deleteNoteHandler: (val: number) => any
    updateYoutubeLink :(val: string, time: number) => void
    time: number
   
}
  
  
export default function NotePrevAccordian({noteSummary, deleteNoteHandler,  updateYoutubeLink }: stateChangeProps) {

    const notes = noteSummary.map((note) => {
        return <Note 
          title={note.title}
          time={note.time}
          content={note.content} 
          _id={note._id}
          deleteNoteHandler={deleteNoteHandler}
          updateYoutubeLink={updateYoutubeLink}
          youtube_Link= {note.youtube_link}
          />
      })

    return (
        <div>{notes}</div>
    )
}