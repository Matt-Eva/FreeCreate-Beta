import React from 'react'
import {useParams} from "react-router-dom"

function ViewWrit() {

    const {id} = useParams()

    return (
        <div>
            <h1>View Writing</h1>
        </div>
    )
}

export default ViewWrit
