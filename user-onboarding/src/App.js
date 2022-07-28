import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

import schema from './validation/formSchema';
import * as yup from 'yup';

import Form from './Compoents/Form';

const initialFormValues = {
  username: '',
  password:'',
  email:'',
  tos: false
}

const initialFormErrors = {
  username: '',
  password:'',
  email:'',
  tos: ''
}

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);

  const handleSubmit = () => {
  axios.post('http://regres.in/api/users', formValues)
  .then(res => {
    setUsers([res.data, ...users])

  })
  .catch(err => console.log(err))
  }

  const validate = (name, value) => {
      yup.reach(schema, name)
      .validate(value)
      .the(() => setFormErrors,({...formErrors, [name]: '' }))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]  }))
  }

  const handleChange = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value});
  }
  return (
    <div className="App">
      <Form values={formValues} change={handleChange} errors={formErrors} submit={handleSubmit} />
   
    {users.map(user => (
      <div key={user.id}>
        <p>{user.createdAt}</p>
        <p>{user.email}</p>
        </div>
    ))}
    </div>
  );
}

export default App;
