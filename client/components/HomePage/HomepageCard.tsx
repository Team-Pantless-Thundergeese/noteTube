import { useState } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface stateChangeProps {
    _id: string,
}

export default function HomepageCard ( { _id }: stateChangeProps){
    const onclick = () => {
        console.log('clicked')
    }

    return (
        <Card sx={{ maxWidth: 330 }}>
          <CardActionArea onClick={onclick}>
            {/* <img src="/sponge.png" alt="sponge" /> */}
            <CardMedia
              component="img"
            //   width="100%"
              height="184"
              src={`${_id}`}
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
      );
  }
