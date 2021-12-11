import { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell,TableHead, TableRow, Chip, Button, Link   } from '@material-ui/core';
import './listingUser.css'

const ListingUser  = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(()=>{
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setUsersList(users)
  },[])
  const handleDelete = useCallback((id)=>{
    const updatedUsers = usersList.filter((item)=>item.id !== id);
    setUsersList(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  },[usersList])
  return (
    <div>
      <h2>User Listing</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Friends</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell><div  className="flexWrap">{row.friends.map((item)=><Chip  label={item}/>)}</div></TableCell>
              <TableCell>
                <Link  href={`/?id=${row.id}`} color="primary" >Edit</Link> <Button color="secondary" onClick={()=>handleDelete(row.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ListingUser;