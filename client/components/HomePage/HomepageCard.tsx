import { useState } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom'
import getYouTubeID from "get-youtube-id";



interface stateChangeProps {
    _id: string,
    setId: (_id: string) => void
    getSpecificVideos: (val: string) => void
}

//pass set props for userID videoId and view to this component
export default function HomepageCard ( { _id, setId, getSpecificVideos }: stateChangeProps){
    const onclick = () => {
      setId(_id)
      getSpecificVideos(_id)
    }

    return (
      <Link to='/notepage' onClick={onclick}>
        <Card sx={{ maxWidth: 330 }}>
          <CardActionArea >
            {/* <img src="/sponge.png" alt="sponge" /> */}
            <CardMedia
              component="img"
            //   width="100%"
              height="184"
              src={`http://img.youtube.com/vi/${_id}/hqdefault.jpg`}
              alt="youtube vid"
            />
            <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Some youtube video title idk
          </Typography>
          <Typography variant="body2" color="text.secondary">
            maybe the creator????
          </Typography>
        </CardContent>
          </CardActionArea>
        </Card>
      </Link>
      );
  }
