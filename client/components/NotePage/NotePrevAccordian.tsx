import React from 'react';
import Note from './Note';

interface stateChangeProps {
    noteSummary: Array<any>,
    deleteNoteHandler: (note_id: string, user_id: number, id: string) => any
    updateYoutubeLink :(val: string, time: number) => void
    time: number
    id: string
   
}
  
  
export default function NotePrevAccordian({id, noteSummary, deleteNoteHandler,  updateYoutubeLink }: stateChangeProps) {

    const notes = noteSummary.map((note) => {
        return <Note 
          title={note.title}
          time={note.time}
          content={note.content} 
          _id={note._id}
          deleteNoteHandler={deleteNoteHandler}
          updateYoutubeLink={updateYoutubeLink}
          youtube_Link= {note.youtube_link}
          id={id}
          />
      })

    return (
        <div className="itemconfiguration" >{notes}</div>
    )
}