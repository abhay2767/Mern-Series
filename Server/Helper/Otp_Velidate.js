const oneMinute = async(otpTime)=>{
    try {
        
        console.log("TimeStamp is:- "+otpTime)
        const c_datetime = new Date();
        var differentValue = (otpTime-c_datetime.getTime())/1000;
        differentValue /= 60;
        console.log("Expire otp:-"+Math.abs(differentValue));
        if(Math.abs(differentValue) > 1){
            return true
        }
        else{
            return false
        }

    } catch (error) {
        console.log(error)
    }
}

const fiveMinute = async(otpTime)=>{
    try {
        
        console.log("TimeStamp is:- "+otpTime)
        const c_datetime = new Date();
        var differentValue = (otpTime-c_datetime.getTime())/1000;
        differentValue /= 60;
        console.log("Expire otp:-"+Math.abs(differentValue));
        if(Math.abs(differentValue) > 5){
            return true
        }
        else{
            return false
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {oneMinute,fiveMinute}