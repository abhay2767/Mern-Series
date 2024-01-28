import { useEffect, useState } from 'react';
import './Design.css';
import { useAuth } from '../store/auth';
import { MdOutlineDeleteForever } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Images = () => {
  const { Apipath, AuthorizationToken } = useAuth();
  const [imagedata, setImagedata] = useState([]);
  const style = { color: "white", fontSize: "2.5em", cursor: "pointer" }
  const style1 = { color: "white", fontSize: "1.5em", cursor: "pointer" }

  useEffect(() => {
    GetImages();
  }, []); // Empty dependency array to fetch images only once when component mounts


  

  const GetImages = async () => {
    try {
      const response = await fetch(`${Apipath}/api/data/get-image`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken
        },
      });
      const datas = await response.json();
      setImagedata(datas);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNode = async (id) => {
    try {
      const response = await fetch(`${Apipath}/api/data/delete-image/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      })
      if (response.ok) {
        toast.success("Image Deleted")
        GetImages();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (src, alt) => {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = src;
    captionText.innerHTML = alt;
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  };




  return (
    <>
      <div className='bg'>
        <div className='images'>
          {imagedata.map((currdata, index) => {
            const { images, name } = currdata;
            return (
              <div key={index} className='card2'>
                {/* Ensure each image has a unique id */}
                <div className='card1-border'>
                <img
                  onClick={() => handleClick(`${Apipath}/api/images/${images}`, name)}
                  src={`${Apipath}/api/images/${images}`}
                  alt={name}
                  width={200}
                  height={50}
                />
                <h1>{name}</h1>
                <div className="icons">
                  <a href={`${Apipath}/api/images/${images}`} download><PiDownloadSimpleBold style={style1} /></a> 
                  <MdOutlineDeleteForever onClick={() => deleteNode(currdata._id)} style={style} />
                </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <div id="myModal" className="modal">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <img className="modal-content" id="img01" />
        <div id="caption"></div>
      </div>
    </>
  );
};

export default Images;
