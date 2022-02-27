/* eslint-disable default-case */
import { useState, useEffect } from 'react';
import { Table } from 'reactstrap'
import axios from 'axios';
import _ from 'lodash';
import { srv } from '../config/srvConfig'
import { Edit, Trash } from 'react-feather';
import { useDispatch } from 'react-redux';
import { setInformation } from '../Redux/informationSlice';
import ModalComponent from './ModalComponent'
import cssModule from './table.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'





function TableComponent() {
    const dispatch = useDispatch()
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

    function deleteEntry(user_id) {
        const payload = {
            user_id: user_id
        }
        axios.post(`${srv}/deleteUser`, payload)
        .then((res) => {
            if(res.data.type === "ERROR") {
                //Error handling here
            }
            else {
                window.location.reload();
            }
        })
    }

    function editRow(user_id, first_name, last_name, password, birthday, gender_id) {
        const payload = {
            user_id, 
            first_name, 
            last_name, 
            password, 
            birthday, 
            gender_id
        }
        //sets global redux state when edit is clicked
        dispatch(setInformation(payload))
        //opens modal
        setOpen(true);
    }

    
    function newEntry() { 
        const payload = {
            user_id: null, 
            first_name: null, 
            last_name: null, 
            password: null, 
            birthday: new Date(), 
            gender_id: 0
        }
        //clears redux state when new entry is desired
        dispatch(setInformation(payload))
        
        //opens modal
        setOpen(true);
    }


    return (
        <div>
            <Table striped>
                <thead>
                <tr>
                    <th>Actions</th>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Password</th>
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
                            <tr key={_.uniqueId()} className={cssModule.row}>
                                <td className={cssModule.row}><Edit onClick={() => editRow(user.user_id, user.first_name, user.last_name, user.password, user.birthday, user.gender_id)} /> <Trash onClick={() => deleteEntry(user.user_id)} /></td>
                                <th className={cssModule.row}>{user.user_id}</th>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.password}</td>
                                <td>{usDate}</td>
                                <td>{gender}</td>
                            </tr>
                        )
                    })}
                            <tr  onClick={newEntry}>
                                <th scope="row">+</th>
                                <td>{" "}</td>
                                <td>{" "}</td>
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