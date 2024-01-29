import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Notes = ({ setProgress }) => {
  const { Apipath, AuthorizationToken } = useAuth()
  const style = { color: "white", fontSize: "2.5em", cursor: "pointer" }
  const style1 = { color: "white", fontSize: "1.3em", cursor: "pointer" }
  const [data, setData] = useState('')

  const notedata = async () => {
    setProgress(10)
    try {
      const response = await fetch(`${Apipath}/api/data/get-notes`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken
        },
      })
      setProgress(50)
      const datas = await response.json()
      setData(datas)
      setProgress(100)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNode = async (id) => {
    try {
      const response = await fetch(`${Apipath}/api/data/delete-notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      })
      if (response.ok) {
        toast.success("Notes Deleted")
        notedata()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    notedata()
  }, [1])


  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Notes')} - React_veet`;

  return (
    <>
      <div className="bg">
        <div className="contanier">
          {data && data.map((currdata, index) => {
            const { title, desc, tag } = currdata
            return (
              <div key={index} className="card1">
                <div className="card1-border">
                  <h2>{title}</h2>
                  <p>{desc}</p>
                  <b>{tag}</b>
                </div>
                <div className="icons">
                  <Link to={`/notes/${currdata._id}/edit`}><FaEdit style={style1} /></Link>
                  <MdOutlineDeleteForever onClick={() => deleteNode(currdata._id)} style={style} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Notes