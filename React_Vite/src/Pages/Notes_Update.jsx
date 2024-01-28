/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useAuth } from "../store/auth"
import { useParams } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Notes_Update = ({setProgress}) => {
    const navigate = useNavigate();
    const { AuthorizationToken,Apipath } = useAuth();
    const params = useParams();
    // console.log("what is params:-"+params)
    const [data, setdata] = useState({
        name: "",
        email: "",
        mobile: "",
    })
    const data1 =  JSON.stringify(data)
    console.log("Data is:-"+data1)

    const getSingleNoteData = async () => {
        setProgress(10)
        try {
            const response = await fetch(`${Apipath}/api/data/get-current-note/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                },
            })
            const data = await response.json();
            setProgress(50)
            console.log("Single Note data:-" + data.result)
            setdata(data.result)
            setProgress(100)
        } catch (error) {
            console.log(error)
        }
    }

     const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${Apipath}/api/data/update-notes/${params.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: AuthorizationToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title:data.title,
                    desc:data.desc,
                    tag:data.tag,
                }),
            });
            console.log("In")
            const responsedata = await response.json()
            console.log(responsedata)
            toast.success("Note Updated succussfully")
            navigate('/notes')

        } catch (error) {
            console.log(error)
        }
    } 

    const handleInput = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }



    useEffect(() => {
        getSingleNoteData()
    }, [])

    return (
        <>
            <div className="float-container">
                <div className="float-child">
                    <div className="blue">
                        <div className="ragistration-form">
                            <h1 className='main-heading '>Update Note</h1>
                            <form method="POST">
                                <div>
                                    <label className='lable' htmlFor='title'>Title</label>
                                    <input type="text" name="title" value={data.title} onChange={handleInput} placeholder='Enter title...'  required autoComplete='off' />
                                </div>

                                <div>
                                    <label className='lable' htmlFor='desc'>Description</label>
                                    <input type="text" name="desc" value={data.desc} onChange={handleInput} placeholder='Enter description...'  required autoComplete='off' />
                                </div>

                                <div>
                                    <label className='lable' htmlFor='password'>Tag</label>
                                    <input type="text" name="tag" value={data.tag} onChange={handleInput} placeholder='Enter tag...'  required autoComplete='off' />
                                </div>

                            </form>
                            <div>
                                <button type="button"  onClick={handleSubmit}  className="btn">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes_Update