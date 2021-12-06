import React from 'react'
import { Link } from 'react-router-dom'


function Admin() {
    return (
        <div>
           <button>Add a Question...</button> 
           
           <Link to="/mcqadder">MCQ</Link>
           <Link to="/riddlesadder">Riddle</Link>
        </div>
    )
}

export default Admin
