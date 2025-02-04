import { useState } from "react";
import { convertBase64 } from "../helper";

const Profile = () => {
    const [imageString, setImageString] = useState(null);
    const handleImage = async (e) => {
        let file = e.target.files[0];
        const fileString = await convertBase64(file);
        setImageString(fileString);
    }
    return (
        <div>
            <input type="file" name="imgstring" onChange={handleImage} />
            <img src={imageString} />
        </div>
    )
}

export default Profile