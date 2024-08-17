

import React,{ useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NotesContext'

const About=()=> {
 
  
  return (
    <div>
        this is a about page 
    </div>
  )
}

export default About
















// import React,{ useContext, useEffect } from 'react'
// import NoteContext from '../context/notes/NotesContext'

// const About=()=> {
//   const a=useContext(NoteContext) 
//   useEffect(() => {
//     a.update();
//   }, [])
  
//   return (
//     <div>
//         this is a about page {a.state.name} and their age is {a.state.age}
//     </div>
//   )
// }

// export default About