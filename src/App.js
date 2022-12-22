import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`




function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [text, setText] = useState('')
  let url;

  const fetchPhotos = async() => {
    url = `${mainUrl}${clientID}`

    try{
      setLoading(true)
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      setPhotos(data)
      setLoading(false)

    }catch(err){
      console.log(err)
      setLoading(false)

    }
  }

  const Submit =(e)=>{
    e.preventDefault()
    console.log(text)
  }


  useEffect(() => {
    fetchPhotos()
  }, [url])
  return (
          <main>
            <section className="search">
              <form className="search-form" onSubmit={Submit}>
                <input type="text" placeholder='search for photos' className='form-input' onChange={(e)=> setText(e.target.value)} />
                <button type='submit' className="submit-btn" onClick={Submit}><FaSearch/> </button>
              </form>
            </section>

            <section className="photos">
              <div className="photos-center">
                {
                  photos.map((photo, i) => {
                    return <Photo key={photo.id} {...photo} />
                  })
                    }
              </div>
              {loading && <h2 className='loading'>Loading...</h2>}
            </section>
          </main>
  )
}

export default App
