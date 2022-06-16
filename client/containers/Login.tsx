import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface stateChangeProps {
}

export default function Login({ }: stateChangeProps){

    
const callLogin = () => {
    console.log("call Login called")
    window.location.href = "http://localhost:8080/auth/google" 

}
  



 return (
        <>
        <div>
        <Stack direction="row" spacing={2}>
            <Button color="secondary" onClick={callLogin}>Login</Button>
        </Stack>
        </div>
        </>
    )
  }