/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useAuth } from "../store/auth"
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Admin_UserUpdate = ({ setProgress }) => {
    const navigate = useNavigate();
    const { AuthorizationToken, Apipath } = useAuth();
    const params = useParams();
    // console.log("what is params:-"+params)
    const [data, setdata] = useState({
        name: "",
        email: "",
        mobile: "",
    })
    JSON.stringify(data)
    // console.log("Data is:-"+data1)

    const getSingleUserData = async () => {
        setProgress(10)
        try {
            const response = await fetch(`${Apipath}/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                },
            })
            const data = await response.json();
            setProgress(50)
            // console.log("Single user data:-" + data.result)
            setdata(data.result)
            setProgress(100)
        } catch (error) {
            console.log(error)
        }
    }

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    /* change name in title */
    document.title = `${capitalize('Admin/Update-user')} - React_veet`;

    const handleSubmit = async () => {
        // e.preventDefault()
        try {
            const response = await fetch(`${Apipath}/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: AuthorizationToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                }),
            });
            // console.log("In")
            await response.json()
            // console.log(responsedata)
            toast.success("User Updated succussfully")
            navigate('/admin/users')

        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }



    useEffect(() => {
        getSingleUserData()
    }, [])

    return (
        <>
            <div className="float-container">
                <div className="float-child">
                    <div className="blue">
                        <div className="ragistration-form">
                            <h1 className='main-heading '>Update User</h1>
                            <form method="POST">
                                <div>
                                    <label className='lable' htmlFor='name'>Name</label>
                                    <input type="text" name="name" value={data.name} onChange={handleInput} placeholder='Enter your name' id="name" required autoComplete='off' />
                                </div>

                                <div>
                                    <label className='lable' htmlFor='email'>Email</label>
                                    <input type="text" name="email" value={data.email} onChange={handleInput} placeholder='Enter your email' id="email" required autoComplete='off' />
                                </div>

                                <div>
                                    <label className='lable' htmlFor='password'>Mobile</label>
                                    <input type="text" name="mobile" value={data.mobile} onChange={handleInput} placeholder='Enter your mobile' id="message" required autoComplete='off' />
                                </div>

                            </form>
                            <div>
                                <button type="button" onClick={handleSubmit} className="btn">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_UserUpdate