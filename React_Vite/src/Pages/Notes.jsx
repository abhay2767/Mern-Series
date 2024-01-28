import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Notes = () => {
  const { Apipath, AuthorizationToken } = useAuth()
  const style = { color: "white", fontSize: "2.5em", cursor: "pointer" }
  const style1 = { color: "white", fontSize: "1.3em", cursor: "pointer" }
  const [data, setData] = useState('')


  const notedata = async () => {
    try {
      const response = await fetch(`${Apipath}/api/data/get-notes`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken
        },
      })
      const datas = await response.json()
      setData(datas)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNode = async(id)=>{
    try {
      const response = await fetch(`${Apipath}/api/data/delete-notes/${id}`,{
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      })
      if(response.ok){
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

  return (
    <>
      <div className="bg">
        <div className="contanier">
          {data && data.map((currdata, index) => {
            const { title, desc, tag } = currdata
            return (
              <div key={index} className="card1">
                <div className="cart1-border">
                <h2>{title}</h2>
                <p>{desc}</p>
                <b>{tag}</b>
                </div>
                
                <div className="icons">
                <Link to={`/notes/${currdata._id}/edit`}><FaEdit style={style1}/></Link>
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