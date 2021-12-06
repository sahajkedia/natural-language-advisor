import React , {useState} from 'react'
import './qs.css'
function RiddlesAdder() {
    
    const submitHandler = (e) => {
        
        e.preventDefault()
        let data = {
          qsname:e.target.Question.value,
            answer:e.target.ans.value,
        }
      
       const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Accept': 'application/json' },
        body: JSON.stringify(data)
      }
      console.log(data)
      
        fetch('http://localhost:4000/api/riddlesquestionadding', requestOptions)
        .then(response => {
          if(response.status===200){
            console.log(JSON.stringify(response))
          }
        }
          
          );

          window.location.reload();
      }


    
    return ( 
        <form onSubmit={submitHandler} style={{ marginTop:"50px"}} >
         
            <label style={{ marginBottom:"30px"}}>Enter the Question...</label><br />
            <textarea type="text" placeholder="question name" required="true" name="Question" style={{ height:"30px", width:"60%"}}/>
            <br />
            {/* <label  style={{ marginBottom:"30px"}}>Select The Correct Option</label><br /> */}
            <br />
            <div className="options">
            {/* <input type="text"  placeholder="Option 1" name="op1" required={true}  /><br /> */}
            {/* <input type="text"  placeholder="Option 2"name="op2" required={true} /><br />
            <input type="text"  placeholder="Option 3" name="op3" required ={true}/><br />
            <input type="text" placeholder="Option 4" name="op4" required= {true}/><br /> */}

            <input type="text" placeholder="Correct Answer" name="ans" /><br />
            </div><br /><br />
           
            <button type="submit">Add this Riddle..</button>

        </form>  
      
    )
}

export default RiddlesAdder
