/* eslint-disable default-case */
import { useState, useEffect } from 'react';
import { Table } from 'reactstrap'
import axios from 'axios';
import { srv } from '../config/srvConfig'
import ModalComponent from './ModalComponent'
import 'bootstrap/dist/css/bootstrap.min.css'



function TableComponent() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);

    //fetches all users from backend
    useEffect(() => {
        axios.get(`${srv}/fetchAllUsers`)
        .then((res) => {
            if(res.data.type === "SUCCESS") {
              setData(() => res.data.users)
            }
        })
    },[])

    function toggle() {
        setOpen(() => !open);
    }



    return (
        <div>
            <Table striped>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Birthday</th>
                    <th>Gender</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((user) => {
                        let gender;

                        //turns gender id into gender name
                        switch(user.gender_id) {
                            case 0:
                                gender="Male";
                                break;
                            case 1:
                                gender="Female";
                                break;
                        }

                        //turns date string into us date format
                        const dateTime = new Date(user.birthday)
                        const usDate = new Intl.DateTimeFormat('en-US').format(dateTime)
                        return (
                            <tr>
                                <th scope="row">{user.user_id}</th>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{usDate}</td>
                                <td>{gender}</td>
                            </tr>
                        )
                    })}
                            <tr>
                                <th scope="row" onClick={toggle}>+</th>
                                <td>{" "}</td>
                                <td>{" "}</td>
                                <td>{" "}</td>
                                <td>{" "}</td>
                            </tr>
                </tbody>
            </Table>
            <ModalComponent open={open} toggle={toggle} />
        </div>
    )
}

export default TableComponent