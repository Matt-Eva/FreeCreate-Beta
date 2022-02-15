import React from 'react'
import Button from "react-bootstrap/Button"
import {useDispatch} from "react-redux"

function LibraryButton({libType, user, inLib, libItemId, creation, addLibItemState, removeLibItemState, addToLibraryState, removeFromLibraryState}) {
    const dispatch = useDispatch()
    console.log(libType, user, inLib, libItemId, creation)

    function addToLibrary(){
        let newLibItem;
        if(libType === "writ"){
            newLibItem = {
                writing_id: creation.id,
                user_id: user.id 
            }
        } else if(libType === "aud"){
            newLibItem = {
                audio_id: creation.id,
                user_id: user.id
            }
        }else if(libType === "art"){
            newLibItem = {
                art_id: creation.id,
                user_id: user.id
            }
        } else if(libType === "vid"){
            newLibItem = {
                video_id: creation.id,
                user_id: user.id
            }
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newLibItem)
        }
        fetch(`/api/${libType}_lib_items`, configObj)
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            dispatch(addLibItemState(data))
            dispatch(addToLibraryState(creation))
        })
    }

    function removeFromLibrary(){

    }

  return (
      <>
    {user ? ( inLib ? <Button variant="success" onClick={removeFromLibrary}>- Lib</Button> : <Button variant="success" onClick={addToLibrary}>+ Lib</Button>) : <Button variant="success" disabled>+ Lib</Button> }
    </>
  )
}

export default LibraryButton;