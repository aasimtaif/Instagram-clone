import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {  Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import { db, storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc,serverTimestamp } from "firebase/firestore";
// import { FirebaseError } from 'firebase/app';

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


export default function ImageUpload({ userName }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
    // const [url, setUrl] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            console.log(e.target.files[0]);
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        if (!image) {
            console.log("image not found");
            return
        }
        const storageRef = ref(storage, `images/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        console.log(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(prog)
            },
            (err) => {
                console.log(err)
                alert(err)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const docRef = await addDoc(collection(db, "posts"), {
                        timestamp:serverTimestamp(),
                        username: userName,
                        caption: caption,
                        imageurl: downloadURL
                    });
                    console.log("Document written with ID: ", docRef.id);
                    // setUrl(downloadURL)
                    console.log('File available at', downloadURL);
                });
                setImage(null)
                setCaption("")
                setProgress(0)
                handleClose()

            }
        )
        console.log('hello')

    }



    return (
        <div>

            <Button onClick={handleOpen}>upload</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>

                    <div className="app_header">
                        <img className="app_headerImage" src="https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387__480.png" alt='instagram poster' />
                    </div>
                    <div>
                        <progress value = {progress} max = "100"/>
                    </div>
                    <Input type="text" placeholder="caption..." onChange={e => setCaption(e.target.value)} />
                    <Input type="file" onChange={handleChange} />
                    <Button type="submit" onClick={handleUpload} >Post</Button>

                </Box>
            </Modal>

        </div>
    )
}
