/* eslint-disable react/prop-types */
// import Mata from '../Images/Mata.png'
import './Design.css'
import Navbar from '../Component/Navbar'
import { useAuth } from '../store/auth'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import Footer from '../Component/Footer'
import LoadingSpiner from '../Component/LoadingSpiner'
import '../Component/Navbar.css'

const Home = ({ setProgress }) => {


  const { userAuthentication, Apipath, AuthorizationToken , isLoggedIn, isLoading,user} = useAuth()
  useEffect(() => {
    setProgress(10)
    userAuthentication()
    setTimeout(() => {
      setProgress(100)
    }, 1500);
  }, [])

  /* Change the first latter of word */
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Upload-data')} - React_veet`;

  let location = useLocation();

  /* API for upload Notes */
  const [data, setData] = useState({
    title: "",
    desc: "",
    tag: ""
  })

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Apipath}/api/data/add-notes`, {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data.title, desc: data.desc, tag: data.tag }),
      })
      const datas = await response.json()

      if (response.ok) {
        toast.success("Notes Uploaded")
        setData({
          title: "",
          desc: "",
          tag: ""
        })
      }
      else {
        toast.error(datas.extra_Error ? datas.extra_Error : datas.message)
      }

    } catch (error) {
      console.log(error)
    }
  }

  /* Api for Image Upload */
  const [name, setname] = useState('')
  const [image, setimage] = useState('')
  const handleInput1 = (e) => {
    setname(e.target.value)
  }
  const handleSubmit2 = async (e) => {
    e.preventDefault()
    try {
      const formdata = new FormData
      formdata.append('name', name)
      formdata.append('images', image)
      const response = await fetch(`${Apipath}/api/data/add-image`, {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: formdata,
      });
      const json = await response.json()
      // console.log(json)

      if (response.ok) {
        toast.success("Image Uploaded")
        setname('')
        setimage('')
      }
      else {
        toast.error(json.extra_Error ? json.extra_Error : json.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  /* Api for Document Upload*/
  const [name1, setname1] = useState('')
  const [doc, setdoc] = useState('')
  const handleInput2 = (e) => {
    setname1(e.target.value)
  }
  const handleSubmit3 = async (e) => {
    e.preventDefault()

    try {
      const formdata = new FormData
      formdata.append('name', name1)
      formdata.append('doc', doc)
      const response = await fetch(`${Apipath}/api/data/add-document`, {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: formdata,
      });
      const json = await response.json()
      // console.log(json)
      if (response.ok) {
        toast.success("Document Uploaded")
        setname1('')
        setdoc('')
      }
      else {
        toast.error(json.extra_Error ? json.extra_Error : json.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
   if (!isLoggedIn) {
    return <Navigate to='/login' />
  }
  if (isLoading) {
    return <LoadingSpiner />
  }
  if (!user) {
    return <Navigate to='/login' />
  } 


  return (
    <>
      <Navbar />

      <div id="header">
        <div className="container">
          <nav className="data-design">
            <a><Link to="/notes" className='data'>Notes</Link></a>
            <a><Link to='/images' className='data'>Images</Link></a>
            <a><Link to='/documents' className='data'>Documents</Link></a>
          </nav>
        </div>
      </div>

      {location.pathname === "/" ? <div className='bg'>
        <div className='images3'>
          <div className='card3'>
            <h1 >Upload Notes</h1>
            <form method='POST'>
              <label ><span>Title</span></label>
              <input type="text" name="title" value={data.title} onChange={handleInput} placeholder='enter title name...' />
              <label ><span>Description</span></label>
              <input type="text" name="desc" value={data.desc} onChange={handleInput} placeholder='enter description...' />
              <label ><span>Tag</span></label>
              <input type="text" name="tag" value={data.tag} onChange={handleInput} placeholder='enter tag...' />
            </form>
            <div className='A'><input onClick={handleSubmit1} className='button2' type="button" value="submit" /></div>
          </div>
          <div className='card3'>
            <h1 >Upload Image</h1>
            <form method='POST'>
              <input type="file" onChange={(e) => setimage(e.target.files[0])} name="image" accept="image/*" />
              <label ><span>Name</span></label>
              <input type="text" name="name" value={name} onChange={handleInput1} placeholder='enter file name...' />
            </form>
            <div className='A'><input className='button2' onClick={handleSubmit2} type="button" value="submit" /></div>
          </div>
          <div className='card3'>
            <h1 >Upload Document</h1>
            <form method='POST'>
              <input type="file" onChange={(e) => setdoc(e.target.files[0])} name="doc" accept=".pdf" />
              <label ><span>Name</span></label>
              <input type="text" onChange={handleInput2} name="name1" value={name1} placeholder='enter file name...' />
            </form>
            <div className='A'><input className='button2' onClick={handleSubmit3} type="button" value="submit" /></div>
          </div>
        </div>

      </div> : <Outlet />}
      <Footer />
    </>
  )
}

export default Home