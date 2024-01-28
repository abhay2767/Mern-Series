import { useState } from "react";
import OtpInput from "./OtpInput";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../store/auth";
import { Navigate } from 'react-router-dom';

const EmailOtp = () => {
    const {Apipath,user,isLoggedIn,isLoading} = useAuth();
    const [emailId, setEmailId] = useState(user.email);
    const [showOtpField, setShowOtpField] = useState(false);
    const [otpData, setotpData] = useState('')
    console.log(user._id)

    if(!isLoggedIn){
        return <Navigate to='/login' />
    }
    if (isLoading) {
        return <h1>Loading..</h1>
    }
    if (!user) {
        return <Navigate to='/login' />
    }

    const handleInput = (e) => {
        setEmailId(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email-validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(emailId)) {
            alert('Enter valid email');
            return;
        }

        // Call the API
        try {
            const response = await fetch(`${Apipath}/api/auth/otp-send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: emailId })
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                toast.success("Mail Send successful");
                setShowOtpField(true); // Show OTP Field after successful API response
            } else {
                toast.error(json.extra_Error ? json.extra_Error : json.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onOtpSubmit = async(otp) => {
        console.log("Verified successful with ", otp);
        console.log("Email is:-"+emailId)
        setotpData(otp)
    }
    
    const postdata = async()=>{
        try {
            console.log("In"+otpData)
            const response = await fetch(`${Apipath}/api/auth/otp-verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: user._id, otp: otpData })
            });
            console.log("In"+emailId)
            const json = await response.json()
            console.log(json)

            if (response.ok) {
                toast.success("Mail verifeied succussfully")
            }
            else{
                toast.error(json.extra_Error ? json.extra_Error : json.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                {
                    !showOtpField ?
                        <form className='emailform' onSubmit={handleSubmit}>
                            <input type='text' value={emailId} onChange={handleInput} placeholder="Enter your email" />
                            <button type="submit">submit</button>
                        </form>
                        :
                        <form>

                        <div>
                            <p className="paragraph">Enter OTP sent to <b>{emailId}</b></p>
                            <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
                            <button onClick={postdata}>verify</button>
                        </div>
                        </form>
                }
            </div>
        </>
    );
}

export default EmailOtp;
