import './App.css';
import { Auth } from "./components/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { collection, getDocs, addDoc, deleteDoc,updateDoc, doc } from 'firebase/firestore';
import { Storage } from "./components/Storage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UploadFile } from "./components/UploadFile";

function App() {

  //creating collection data in webpage.
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const onSubmit = async () => {
    try{
      await addDoc(movieCollection, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  //deleting collection data in webpage.
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc); 
      
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  //updating collection data in webpage.
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("");
  const [updatedMovieReleaseDate, setUpdatedMovieReleaseDate] = useState(0);

  const updateMovie = async (id) => {
    try{
      const updatedMovieDoc = doc(db, "movies", id);
      await updateDoc(updatedMovieDoc, {title: updatedMovieTitle, releaseDate: updatedMovieReleaseDate});
      
      getMovieList();
    } catch(err) {
      console.error(err);
    }
  }

  //reading collection data in webpage.
  const [movieList, setMovieList] = useState([]);

  const movieCollection = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = getDocs(movieCollection);
      
      const filmDetails = (await data).docs.map((doc) => ({ ...doc.data(), id: doc.id}))
      
      setMovieList(filmDetails);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="App">

      <Router>
        <Link to="/uploadfile">UploadFile</Link>
        <Routes>
          <Route path='/uploadfile' element={<UploadFile />} />
        </Routes>
      </Router>

      <Auth />

      <br /><br />
      {/* creating collection in webpage */}
      <div>
        <input type="text" placeholder='Movie title...' onChange={(event) => {setNewMovieTitle(event.target.value)}} />
        <input type="number" placeholder='Movie Releasedate...' onChange={(event) => {setNewMovieReleaseDate(event.target.value)}} />
        <input type="checkbox" onChange={(event) => {setIsNewMovieOscar(event.target.checked)}} />
        <label>Received an Oscar</label>

        <button onClick={onSubmit}>Submit Movie Details</button>
      </div>

      <br /><br />
      {/* reading collection in webpage */}
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color : movie.receivedAnOscar ? "green" : "red"}}> {movie.title} </h1>
            <p> {movie.releaseDate} </p>

            <br />
            {/* delete */}
            <button onClick={() => {deleteMovie(movie.id)}}>Delete Movie</button>

            <br />
            {/* update */}
            <input type="text" placeholder="Update title..." onChange={(e) => setUpdatedMovieTitle(e.target.value)} />
            <input type="number" placeholder='Update releasedate...' onChange={(e) => setUpdatedMovieReleaseDate(e.target.value)} />
            <button onClick={() => {updateMovie(movie.id)}}>Update Movie</button>
          </div>
        ))}
      </div>

      <br /><br />
          <Storage />
    </div>
  );
}

export default App;
