import './App.css';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client"
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setSocket(io("http://localhost:4000"))

  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on("message-from-server", (data) => {
      console.log("message recieved",data);
    })
  }, [socket])

  const handleform = (e) => {
    e.preventDefault()
    socket.emit("send-message", message)
    setMessage("")
  }
  return (
    <div>

      <Box component="form" onSubmit={handleform}>
        <TextField
          size='small'
          id="standard-basic"
          label="Write your msg"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant='text'
          type='submit'
        >Send</Button>
      </Box>
    </div>
  );
}

export default App;