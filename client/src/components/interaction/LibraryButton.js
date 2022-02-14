import React from 'react'
import Button from "react-bootstrap/Button"

function LibraryButton({libType, user, inLib, libItemId, creationId}) {
    console.log(libType, user, inLib, libItemId, creationId)

    function addToLibrary(){

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