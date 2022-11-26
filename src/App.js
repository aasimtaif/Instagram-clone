import './App.css';
import React, { useState, useEffect } from 'react'
import { db,auth } from './firebase'
import {
  collection,
  getDocs,
  // onSnapshot,
  // doc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile,signOut } from "firebase/auth";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import Post from './components/Post'
import BasicModal from './components/BasicModal'

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






function App() {

  const [posts, setPosts] = useState([
  //   {
  //   username: "Mohd Asim",
  //   caption: "First post",
  //   imageurl: "https://4kwallpapers.com/images/walls/thumbs_2t/8813.jpg"
  // }, {
  //   username: " Asim Taif",
  //   caption: "Second post",
  //   imageurl: "https://c4.wallpaperflare.com/wallpaper/990/547/605/digital-art-futuristic-city-car-artwork-wallpaper-preview.jpg"
  // }, {
  //   username: " Taifullah",
  //   caption: "Third post",
  //   imageurl: "https://c4.wallpaperflare.com/wallpaper/556/382/458/fantasy-art-artwork-fan-art-science-fiction-wallpaper-preview.jpg"
  // }
  ])
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState();
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const auth = getAuth();

  const postCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(postCollectionRef);
      console.log(data)
      setPosts(data.docs.map((doc) => ({
        id: doc.id,
        post: doc.data()
      })));
    };

    getUsers();
  }, []);
// console.log(posts)

const signUp = (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      console.log(authUser)
      setUser({...user ,authUser})

      updateProfile(auth.currentUser, {
        displayName: userName
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode, errorMessage)
    });
}

const signout =()=>{ signOut(auth).then(() => {
//  setUser(null)
console.log(user)
}).catch((error) => {
  // An error happened.
});
}

useEffect(( ) => {
  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      console.log(authUser)
    } else {
setUser(null)
    }
  })
  return () => {
    unsubscribe()
  }
}, [user , userName]);

















  return (
    <div className="App">
     
     {user ? (
      <Button onClick={signout}>LogOut</Button>

      ) : (
        <Button onClick={handleOpen}>SignUp</Button>

      )}


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <form className="app_signup">
            <div className="app_header">
              <img className="app_headerImage" src="https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387__480.png" alt='instagram poster' />
            </div>
            <Input type="text" value = {userName} placeholder="username" onChange={(e) => (setUserName(e.target.value))} />
            <Input type="email" value={email} placeholder="Email" onChange={(e) => (setEmail(e.target.value))} />
            <Input type="password" value={password} placeholder="Password" onChange={(e) => (setPassword(e.target.value))} />
            <Button type="submit" onClick={signUp}>SignUp</Button>
          </form>
        </Box>
      </Modal>
      <div className="app_header">
        <img className="app_headerImage" src="https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387__480.png" alt='instagram poster' />
      </div>
      <h1>This is a praactice project
      </h1>
      {posts.map(({id,post}) => (
        <Post username={post.username} caption={post.caption} imageurl={post.imageurl} />
      ))}
  


    </div>

  );
}

export default App;
