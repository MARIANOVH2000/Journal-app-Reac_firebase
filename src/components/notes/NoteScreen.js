import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForms";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange,reset] = useForm(note);

  const { body, title } = formValues;
  //para volverse a ejecutarse
  const activeId=useRef(note.id);
  useEffect(() => {
    //se dispara si solo si el id de la de lnota
    if(note.id!==activeId.current){
      reset(note);
      activeId.current=note.id
    }
   
  }, [note,reset]);
  useEffect(() => {
   dispatch(activateNote(formValues.id,{...formValues}));
  }, [formValues,dispatch]);
  //sino pongo el name="title" y name="body" en cada uno de los input
  //no voy a poder modificar el texto
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes_title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happend today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {note.url && (
          <div className="notes_image">
            <img
              src={note.url}
              alt="Paisaje"
            />
          </div>
        )}
      </div>
    </div>
  );
};
