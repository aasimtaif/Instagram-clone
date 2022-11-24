import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import '../App.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const signUp = (event) => {
event.preventDefault();
  }

  return (
    <div>
      <Button onClick={handleOpen}>SignUp</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
            <form className = "app_signup">
          <div className="app_header">
            <img className="app_headerImage" src="https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387__480.png" alt='instagram poster' />
          </div>
          <Input type="text" placeholder="username" onChange={(e) => (setUserName(e.target.value))} />
          <Input type="text" value={email} placeholder="Email" onChange={(e) => (setEmail(e.target.value))} />
          <Input type="password" value={password} placeholder="Password" onChange={(e) => (setPassword(e.target.value))} />
          <Button type = "submit" onClick={signUp}>SignUp</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}