import './App.css';
import React, { useState, useEffect } from 'react'
import { db } from './firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import Post from './components/Post'
import ImageUpload from './components/ImageUpload';



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

  const [posts, setPosts] = useState([])
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);

  const handleOpen = () => setOpen(true);
  
  const auth = getAuth();

  const postCollectionRef = collection(db, "posts");
  const dataquery = query(postCollectionRef, orderBy('timestamp'))
  useEffect(() => {
    onSnapshot(dataquery, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);
  console.log(posts)



  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log(authUser)
        setUser(authUser)

        setOpen(false)
        updateProfile(auth.currentUser, {
          displayName: userName
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage)
      });

  }

  const signout = () => {
    signOut(auth).then(() => {
      //  setUser(null)
      console.log(user)
    }).catch((error) => {
      // An error happened.
    });
  }
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userDetail = userCredential.user;
        // setUser(userDetail )
        console.log(userDetail.displayName)
        setOpenSignin(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
        setUserName(authUser.displayName)
        console.log(authUser)
      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [user, userName]);
  console.log(userName)

  return (
    <div className="App">

      <Modal
        open={openSignin}
        onClose={() => {
          setOpenSignin(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <form className="app_signup">
            <div className="app_header">
              <img className="app_headerImage" src="https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387__480.png" alt='instagram poster' />
            </div>
            <Input type="email" placeholder="Email" onChange={(e) => (setEmail(e.target.value))} />
            <Input type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))} />
            <Button type="submit" onClick={signIn}>Login In</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={() => { setOpen(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <form className="app_signup">
            <div className="app_header">
              <img className="app_headerImage" src="https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387__480.png" alt='instagram poster' />
            </div>
            <Input type="text" placeholder="username" onChange={(e) => (setUserName(e.target.value))} />
            <Input type="email" placeholder="Email" onChange={(e) => (setEmail(e.target.value))} />
            <Input type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))} />
            <Button type="submit" onClick={signUp}>SignUp</Button>
          </form>
        </Box>
      </Modal>
      <div className="app_header ">
        <img className="app_headerImage" src="https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387__480.png" alt='instagram poster' />

        {user ? (<>
          <Button onClick={signout}>LogOut</Button>

        </>
        ) : (
          <>
            <div classname="app_loginContainer">
              <Button onClick={handleOpen}>SignUp</Button>
              <Button onClick={() => {
                setOpenSignin(true)
              }}>Login</Button>
            </div>
          </>
        )}
      </div>
      <div className="app_post">
        {posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageurl={post.imageurl} />
        ))}
      </div>


      {user?.displayName ? (
        <ImageUpload userName={userName} />
      ) : (
        <h4>Login to  Upload</h4>
      )
      }

    </div>

  );
}

export default App;
