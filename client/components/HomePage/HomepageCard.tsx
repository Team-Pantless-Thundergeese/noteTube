import { useState } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

interface stateChangeProps {
    _id: string,
}

export default function HomepageCard ( { _id }: stateChangeProps){
    const onclick = () => {
        console.log('clicked')
    }

    return (
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea onClick={onclick}>
            {/* <img src="/sponge.png" alt="sponge" /> */}
            <CardMedia
              component="img"
              height="220"
              src={`${_id}`}
            //   alt="youtube vid"
            />
          </CardActionArea>
        </Card>
      );
  }
