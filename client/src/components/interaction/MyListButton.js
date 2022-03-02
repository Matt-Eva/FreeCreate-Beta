import React from 'react'
import Button from "react-bootstrap/Button"
import {useDispatch} from "react-redux"

function MyListButton({listType, user, inList, listItemId, creation, creationList, addListItemState, removeListItemState, setListState, addToListState, removeFromListState}) {
    const dispatch = useDispatch()
    console.log(listType, user, inList, listItemId, creation)

    function addToList(){
        let newListItem;
        if(listType === "writ"){
            newListItem = {
                writing_id: creation.id,
                user_id: user.id 
            }
        } else if(listType === "aud"){
            newListItem = {
                audio_id: creation.id,
                user_id: user.id
            }
        }else if(listType === "art"){
            newListItem = {
                art_id: creation.id,
                user_id: user.id
            }
        } else if(listType === "vid"){
            newListItem = {
                video_id: creation.id,
                user_id: user.id
            }
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newListItem)
        }
        fetch(`/api/${listType}_list_items`, configObj)
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            dispatch(addListItemState(data))
            if (creationList.length === 0) {
                fetch(`/api/list${listType}`)
                .then(r => r.json())
                .then(data =>{
                    console.log(data[`${listType}`])
                    dispatch(setListState(data[`${listType}`]))
                })
            } else {
                dispatch(addToListState(creation))
            }
        })
    }

    function removeFromList(){
        fetch(`/api/${listType}_list_items/${listItemId}`, {method: "DELETE"})
        .then(()=>{
            dispatch(removeListItemState(listItemId))
            dispatch(removeFromListState(creation.id))
        })
    }

  return (
      <>
    {user ? ( inList ? <Button variant="success" onClick={removeFromList}>- List</Button> : <Button variant="success" onClick={addToList}>+ List</Button>) : <Button variant="success" disabled>+ List</Button> }
    </>
  )
}

export default MyListButton;