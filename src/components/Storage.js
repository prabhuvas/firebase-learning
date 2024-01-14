import React, { useState } from 'react';
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export const Storage = () => {

    const [fileUpload, setFileUpload] = useState();

    const uploadFile = async () => {
        if(!fileUpload) return;
        const filesFolderRef = ref(storage, `projectfiles/${fileUpload.name + v4()}`);
        try{
            await uploadBytes(filesFolderRef, fileUpload).then((snaphsot) => {
                getDownloadURL(snaphsot.ref).then((url) => {
                    setFileUpload((prev) => [...prev, url]); 
                })
            })
        } catch(err) {
            console.error(err);
        }
    }

  return (
    <div>
        <input type="file" onChange={(e) => {setFileUpload(e.target.files[0])}} />
        <button onClick={uploadFile}> Upload File </button>
    </div>
  );
}
