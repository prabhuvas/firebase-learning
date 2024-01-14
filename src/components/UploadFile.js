import React, {useState, useEffect} from 'react';
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export const UploadFile = () => {

    const [imageList, setImageList] = useState([] );

    const imageListRef = ref(storage, "projectfiles/");

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, []);

  return (
    <div>
        <div className='img-div'>
        {imageList.map((url) => {
            return <img src={url} />;
        })} <br />
        </div><br />
    </div>
  );
}
