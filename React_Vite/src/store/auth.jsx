import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();
/* it is Called Provider */
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, settoken] = useState(localStorage.getItem("Token"))
    const [serviceData, setServiceData] = useState("");
    const [contactData, setContactdata] = useState("");
    const [user, setuser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const AuthorizationToken = `Bearer ${token}`;

    //  const Apipath = "http://localhost:5000" || import.meta.env.Server_Address ;
    const Apipath = "http://localhost:5000"
    // console.log(Apipath)
    const fetchData = async () => {
        try {
            const response = await fetch(`${Apipath}/api/service/servicedata`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setServiceData(data.response);
                // console.log(data.response)
            }
            else {
                console.error("Error while fetching data")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchContactdata = async () => {
        try {
            const response = await fetch(`${Apipath}/api/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setContactdata(data);
                // console.log(data.contacts)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const storeTokenInLs = (servertoken) => {
        settoken(servertoken)
        return localStorage.setItem('Token', servertoken)
    };

    let isLoggedIn = !!token;
    // console.log(isLoggedIn)

    const LogoutUser = () => {
        settoken("");
        return localStorage.removeItem("Token")
    }

    //Jwt get the User Data who is currently loged in
    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${Apipath}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                }
            })
            if (response.ok) {
                const data = await response.json();
                setuser(data.userData)
                // console.log(data.userData)
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userAuthentication()
        fetchData()
        fetchContactdata()
    }, [])


    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, LogoutUser, fetchData, user, isLoading, serviceData, contactData, fetchContactdata, AuthorizationToken, Apipath,userAuthentication}}>
        {children}
    </AuthContext.Provider>
}

/* it is called Consumer */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider")
    }
    return authContextValue;
}