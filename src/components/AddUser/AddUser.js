import { TextField, Container, Box, Button } from '@material-ui/core';
import { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Tags from '../Tags/Tags'
import './addUser.css'
const AddUser = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const tagRef = useRef();
  const  navigate = useNavigate();
  useEffect(()=>{
    const id = window.location.search.split('=')[1];
    if(id) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const filteredItem = users.filter((item)=>item.id === Number(id));
      setFormValues({
        name: filteredItem[0].name,
        email: filteredItem[0].email,
        address: filteredItem[0].address,
      })
      setTags(filteredItem[0].friends)
    }
  },[])
  const handleInputChange = useCallback((e)=>{
    setError('')
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  },[formValues])

  const handleFriendsAdded = useCallback((e)=>{
    setError('')
    e.preventDefault();
    setTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  },[tags]);

  const handleSubmit = useCallback(()=>{
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const id = window.location.search.split('=')[1];
    if(formValues.address && formValues.email && formValues.name && tags.length){
      const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(formValues.email.match(validEmailRegex)){
        const objIndex = users.findIndex((obj => obj.id === Number(id)));
        if(objIndex >= 0) {
          users[objIndex].name = formValues.name;
          users[objIndex].email = formValues.email;
          users[objIndex].address = formValues.address;
          users[objIndex].friends = tags;
        } else{
        const userData = {
          id:users.length +1,
          name: formValues.name,
          email: formValues.email,
          address: formValues.address,
          friends: tags
        }
        users.push(userData)}
        localStorage.setItem("users", JSON.stringify(users));
         navigate('/list')
        
      } else {
        setError('Email id is not valid')
      }
    } else {
      setError('Please enter all fields');
    }
  },[formValues,  navigate, tags])

  return (
    <Container maxWidth="sm">
      <h2>Add User</h2>
      <Box sx={{ bgcolor: '#cfe8fc', display:"flex", flexDirection:'column', padding: '2rem', height:'auto'}} >
        <TextField 
          label="Name"
          id="name"
          name="name"  
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <TextField 
          label='Email'
          id="email"
          name="email"
          type="text"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <TextField 
          label='Address'
          id="address"
          name="address"
          type="text"
          value={formValues.address}
          onChange={handleInputChange}
        />
        <form onSubmit={handleFriendsAdded}>
        <TextField
          fullWidth
          inputRef={tagRef}
          variant='standard'
          size='small'
          placeholder={"Enter tags"}
          className="marginTop"
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                {tags.map((data, index) => {
                  return (
                    <Tags data={data} key={index} />
                  );
                })}
              </Box>
            ),
          }}
        />
        </form>
        {error && <div className="errorMsg">{error}</div>}
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </Box>
    </Container>
  )
}

export default AddUser;