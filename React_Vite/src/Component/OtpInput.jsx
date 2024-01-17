/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react"

const OtpInput = ({ length = 6, onOtpSubmit = () => { } }) => {

    const [otp, setOtp] = useState(new Array(length).fill(""));
    console.log(otp)
    const inputRefs = useRef([]);
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])
    // console.log(inputRefs)
    const handleInput = async (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return

        const newOtp = [...otp];
        //allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        //submit trigger
        const combineOtp = newOtp.join("")
        if (combineOtp.length === length) onOtpSubmit(combineOtp)
        //move to the next input if current field is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }


    };
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1)
        //Optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            //move focus to the previous field on backspace
            inputRefs.current[index - 1].focus();
        }
    };




    return (
        <div>
            {
                otp.map((value, index) => {
                    return (
                        <>
                            <input
                                key={index}
                                type="text"
                                ref={(input) => (inputRefs.current[index] = input)}
                                onChange={(e) => handleInput(index, e)}
                                onClick={() => handleClick(index)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="otpInput" />
                        </>
                    )
                })
            }
        </div>
    )
}

export default OtpInput