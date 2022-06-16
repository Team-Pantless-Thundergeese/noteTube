import React, { useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


interface stateChangeProps {
  handleNoteInput: (val: string) => void;
  youtubeLink: string;
  time: number;
  content: string;
  title: string;
  noteSummary: Array<{}>;
  handleNoteSummary: (val: Array<{}>) => void;
  handleTitle: (val: string) => void;
  
}

export default function AddNoteSection({  handleNoteInput, youtubeLink, time, content, title, noteSummary, handleNoteSummary, handleTitle}: stateChangeProps) {
  
  
  function handleClick() {
     
    const body = {
      title,
      content,
      // username,
      youtubeLink,
      time,
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
        handleNoteSummary(data.newNote);
      })
      .catch((err) => {
        console.log(err);
      });
      handleTitle("");
  }

  return (
    <section className="addNoteSection">
      
<Stack
  direction="column"
  justifyContent="center"
  alignItems="flex-start"
  spacing={2}
>

      <input
        className="inputNoteTitle"
        onChange={(e: any) => handleTitle(e.target.value)}
        placeholder='Note title...'
        type="text"
      />
      {/* <textarea text={text} onChange={handleChange}/> */}
      <textarea
        className="textArea"
        onChange={(e: any) => {
          handleNoteInput(e.target.value);
          // e is our event, t
        }}
        placeholder='Note contents...'
      />
      <Button className="addNoteButton" color="primary" onClick={handleClick}>Add Note</Button>
      </Stack>
      {/* clicking the button will save to NotesSummary */}
    </section>
  );
}
