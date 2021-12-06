// import React from 'react'
// import { Link } from 'react-router-dom'
// function Homepage() {
//     return (
// 		<>
// 		Welcome! Are you waiting to select your career. We've got you covered.<br />
// 		Signup below to get started.<br />
// 		<Link to="/signup"><button>Signup</button></Link>
// 		</>
//     )
// }

// export default Homepage

import React from 'react'
import { Link } from 'react-router-dom'
function Homepage() {
    return (
        <div>
            <h2>What are you </h2>
            <ul>
                <li><Link to="/mcquiz" >Student</Link></li>
                <li><Link to="/questionadder">Admin</Link></li>
            </ul>
        </div>
    )
}

export default Homepage

