import { PiDownloadSimpleBold } from "react-icons/pi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Documents = () => {
  const { Apipath, AuthorizationToken } = useAuth()
  const style = { color: "white", fontSize: "2.5em", cursor: "pointer" }
  const style1 = { color: "white", fontSize: "1.5em", cursor: "pointer" }
  const [data, setData] = useState('')


  const docdata = async () => {
    try {
      const response = await fetch(`${Apipath}/api/data/get-document`, {
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

  const deleteDoc = async (id) => {
    try {
      const response = await fetch(`${Apipath}/api/data/delete-document/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      })
      if (response.ok) {
        toast.success("Document Deleted")
        docdata()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    docdata()
  }, [1])
// const Apipath1= "http://ec2-13-201-42-144.ap-south-1.compute.amazonaws.com:8000"
// const doc1 = "1706438049390-download.pdf"
  return (
    <div className="bg">
      <div className="contanier">
        {data && data.map((currdata, index) => {
          const { name, doc } = currdata
          return (
            <div key={index} className="card4">

              {/* 0
                  I found a work a workaround for that, we can use the following link:
                  http://docs.google.com/gview?url=${url}&embedded=true, for example:
                    < iframe src="http://docs.google.com/gview?url=https://link_to_file.pdf&embedded=true" frameborder="0" id="myiframe" style="height:100%; width:100%;"> 
            */}
            {/* http://ec2-13-201-42-144.ap-south-1.compute.amazonaws.com:8000/api/images/1706438049390-download.pdf */}
              < iframe src={`https://docs.google.com/gview?url=http://ec2-13-201-42-144.ap-south-1.compute.amazonaws.com:8000/api/images/1706438049390-download.pdf&embedded=true`} id="myiframe" />
              <h2>{name}</h2>
              <div className="icons">
                <a href={`https://docs.google.com/gview?url=${Apipath}/api/images/${doc}&embedded=true`} download><PiDownloadSimpleBold style={style1} /></a>
                <MdOutlineDeleteForever onClick={() => deleteDoc(currdata._id)} style={style} />
              </div>
              {/* ${Apipath}/api/images/${doc} */}
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default Documents