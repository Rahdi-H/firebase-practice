// import './App.css'
import { useEffect, useState } from 'react'
import Auth from './components/Auth'
import { auth, db, storage } from './config/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { uploadBytes } from 'firebase/storage'
import { ref } from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([])
  const refMovie = collection(db, "Movie")
  const getList = async () => {
    try{
      const data = await getDocs(refMovie)
      const filteredData = data.docs.map((doc)=>({...doc.data(), id:doc.id}))
      setMovieList(filteredData)
      console.log(movieList);
    }catch(errr){
      console.log(errr);
    }
  }
  useEffect(()=>{
    getList()
  },[])
  // add new data
  const [title, setTitle] = useState("")
  const [releaseDate, setReleaseDate] = useState(0)
  const [isGood, setIsGood] = useState(false)
  const [updatedtitle, setUpdatedTitle] = useState("")
  const [fileUpload, setFileUpload] = useState(null)
  const addData = async () => {
    try{
      await addDoc(ref, {isGood, title, releaseDate, userID: auth?.currentUser?.uid})
      getList()
    } catch (err) {
      console.log(err);
    }
  }
  const deleteData = async (id) => {
    const movie = doc(db, "Movie", id)
    await deleteDoc(movie)
    getList()
  } 
  const update = async (id) => {
    const movie = doc(db, "Movie", id)
    await updateDoc(movie, {title: updatedtitle})
    getList()
  } 

  const uploadFile = async () => {
    if (!fileUpload) return;
    const folderRef = ref(storage, `Rahdi/${fileUpload.name}`);
    try{
      await uploadBytes(folderRef, fileUpload);
      console.log("Uploading");
    } catch (er){
      console.log(er);
    }
  }
  return (
    <>
      <Auth />
      <div>
        <input type="text" placeholder='Enter title' onChange={(e)=> setTitle(e.target.value)} />
        <input type="number" placeholder='Enter release date' onChange={(e)=> setReleaseDate(Number(e.target.value))} />
        <input type="checkbox" placeholder='Did received oscar' onChange={(e)=> setIsGood(e.target.checked)}/>
        <button onClick={addData}> Add Data</button>
      </div>
      <div>
        {movieList.map((movie)=>(
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <p>{movie.isGood? "Nice": "Dumb"}</p>
            <button onClick={()=> deleteData(movie.id)}>Delete</button>
            <input type="text" onChange={(e)=> setUpdatedTitle(e.target.value)} />
            <button onClick={()=> update(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload</button>
      </div> 
    </>
  )
}

export default App
