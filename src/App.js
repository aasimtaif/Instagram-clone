import './App.css';
import React, { useState, useEffect } from 'react'
import { db } from './firebase'
import {
  collection,
  getDocs,
  // onSnapshot,
  // doc,
} from "firebase/firestore";
import Post from './components/Post'
import BasicModal from './components/BasicModal'

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
console.log(posts)
  return (
    <div className="App">
     
      <BasicModal/>
      <div className="app_header">
        <img className="app_headerImage" src="https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387__480.png" alt='instagram poster' />
      </div>
      <h1>
        lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor
      </h1>
      {posts.map(({id,post}) => (
        <Post username={post.username} caption={post.caption} imageurl={post.imageurl} />
      ))}
      {/*      
      <Post username="Taifullah" caption="Second post" imageurl="https://c4.wallpaperflare.com/wallpaper/990/547/605/digital-art-futuristic-city-car-artwork-wallpaper-preview.jpg" />
      <Post username="Aasim Taifullah" caption="Third post" imageurl="https://c4.wallpaperflare.com/wallpaper/556/382/458/fantasy-art-artwork-fan-art-science-fiction-wallpaper-preview.jpg" /> */}


    </div>

  );
}

export default App;
