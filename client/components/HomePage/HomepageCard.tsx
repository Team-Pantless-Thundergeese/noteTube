import { useState } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import sponge from './sponge.png'


export default function HomepageCard (){
    const onclick = () => {
        console.log('clicked')
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={onclick}>
            {/* <img src="/sponge.png" alt="sponge" /> */}
            <CardMedia
              component="img"
              height="345"
              image={sponge}
            //   alt="youtube vid"
            />
          </CardActionArea>
        </Card>
      );
  }