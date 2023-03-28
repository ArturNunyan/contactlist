import './App.css';
// import {useEffect, useState} from 'react';
import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultState = [
  {id: uuidv4(),
  name: "Captain America",
  phoneNumber: '099123456'},
  {id: uuidv4(),
  name: "Iron Man",
  phoneNumber: '099345678'},
  {id: uuidv4(),
   name: "Aladdin",
   phoneNumber: '099345678'},
 ]

function App() {
  
const [value, setvalue] = useState('');

const [newName, setNewName] = useState('');
const [newNumber, setNewNmber] = useState('');

const [contactListArr, setContactListArr] = useState(defaultState)


document.title = `contactlist - ${contactListArr.length}`
  
  let sortedArr =  contactListArr.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }if (a.name < b.name) {
      return -1
    }
    return 0
  }).map((el) => {
    if (el.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
      return (
        <li key = {el.id}>
          {el.name}
          <button className='deleteButton' onClick={()=>{setContactListArr(contactListArr.filter((listItem) => listItem.id !== el.id))}}>X</button>
          <p><a href='#'>{el.phoneNumber}</a></p>
        </li>
      )
    }
  })
  

  return (
    <div className="App">
      
      <h1>Contact List</h1>

      <input type="text" onChange={(e) => {
        setvalue(e.target.value)
      }}/>
    
      <h2>{value}</h2>
      <ul>{sortedArr}</ul>


      <form className='addContact' onSubmit={(e) => {
        e.preventDefault();
        if (newName && newNumber && !isNaN(newNumber)) {
          setContactListArr(prev => [ ...prev,
              {
                id: uuidv4(),
                name: newName,
                phoneNumber: newNumber
              }]
              )
            };
          setNewName('');
          setNewNmber('')
        }}>

        <input placeholder='name' onChange={(e) => {
          setNewName(e.target.value)
        }}/>
        <br/>        
        <input placeholder='phonenumber' onChange={(e) => {
           setNewNmber(e.target.value);
        }
        }/>
        <br/>
        <input type='submit' value='add' />  
      </form>

    </div>
  );
}

export default App;
