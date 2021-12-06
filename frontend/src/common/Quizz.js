import React, {useEffect, useState} from 'react'
import { Redirect } from 'react-router'

function Quizz() {
    const [Data, setData] = useState([])
    const [MCQAnswered,setMCQAnswered] = useState(false)
    
    
    useEffect( () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                       'Accept': 'application/json' },
          }
          
            fetch('http://localhost:4000/api/mcquiz_page', requestOptions)
            .then((response) => response.json())
            .then((data) => 
               setData(
                data.questions))
                
    }, [])

    const [Marks, setMarks] = useState(0)
    const clickHandler=(o,ans)=>{
        if(o===ans){
            setMarks(Marks + 1)
        }

        else{
            setMarks(Marks - 1)
        }
    }

    const submitHandler = () =>{
       
        console.log(Marks);
        setMCQAnswered(true)
    }

    if(!MCQAnswered)
    return (
        
        <div>
            <h1>Let's get started.</h1>
            <br />
            <form onSubmit={()=>submitHandler()}>
                
                {Data.map((d)=>
                   
                    <div key={d.id}>
                    <label key={d.id}>{d.qs}</label>
                    {  
                        d.options.map((o)=>
                            <ul key={o}>
                                <li  onClick={()=>clickHandler(o,d.ans)}>* {o}</li>
                            </ul>
                        )
                    }
                    </div>
                )}
                <button type="submit" >Submit </button>
            </form>
        </div>
    ) 

    else return <Redirect to="/riddle" />
}

export default Quizz
