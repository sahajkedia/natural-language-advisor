import React from 'react'
import { BrowserRouter as Router, Route , Redirect, Switch } from 'react-router-dom';
import Homepage from './Homepage'
import Question from './QuestionSignup/MCQ.js';
import Quizz from './Quizz';
import Signup from './Signup'
import Signin from './Signin'
import Riddle from './Riddle';
import Admin from './Admin';
import MCQAdding from './QuestionSignup/MCQ.js';
import RiddlesAdder from './QuestionSignup/Riddles';

   function Routing() {
     return (
       <div>
          <Router>
      
      
      <Switch >
        
    <Route path="/questionadder" exact>
    {/* <Homepage /> */}
    <Admin />
    
    </Route>
    
    <Route path="/" exact>
    <Homepage />
    </Route>

    <Route path="/mcqadder" exact>
      <MCQAdding />
      </Route>

      <Route path="/riddlesadder" exact>
      <RiddlesAdder />
      </Route>


    <Route path="/signup" exact>
    <Signup />
    </Route>

    <Route path="/signin" exact>
    <Signin />
    </Route>

    <Route path="/riddle" exact>
    <Riddle />
    </Route>


    <Route path="/mcquiz" exact>
    <Quizz />
    </Route>
    
    
    
    <Redirect to="/" />
    </Switch>
    </Router>

       </div>
     )
   }
   
   export default Routing
   