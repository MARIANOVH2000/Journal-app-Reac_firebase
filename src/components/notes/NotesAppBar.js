import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNotes,startUploading } from "../../actions/notes";


export const NotesAppBar = () => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.notes);
  const handleSave = () => {
    dispatch(startSaveNotes(active));
    // console.log(active);
  };
  const handlePictureClick = () => {
    //cuando hago clcik me dispare el input con el file
    //tengo que ponerlo y llamarlo por el id
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = (e) => {
    const file=e.target.files[0];
    if(file){
      dispatch(startUploading(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>
      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
