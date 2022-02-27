import {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, Label, Input, FormGroup } from 'reactstrap'
import {useSelector} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import {srv} from '../config/srvConfig'
import cssModule from './modal.module.css'



function ModalComponent({open, toggle}) {
    const user = useSelector((state) => state.informationSlice);
    const [birthday, setBirthday] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState(0);
    console.log(gender);
    useDeepCompareEffect(() => {
            console.log(user.gender_id);
            setBirthday(new Date(user.birthday));
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setPassword(user.password);
            setGender(user.gender_id);
    },[user])
    
    function handleSubmit(e) {
        if(!user.first_name) {
            const payload ={
                first_name: firstName,
                last_name: lastName,
                password: password,
                gender_id: gender,
                birthday: birthday,
            }
            axios.post(`${srv}/createUser`, payload)
            .then((res) => {
                if(res.data.type === "ERROR") {
                    // serve error page
                }
            });

        } else if (user.first_name) {
            const payload ={
                user_id: user.user_id,
                first_name: firstName,
                last_name: lastName,
                password: password,
                gender_id: gender,
                birthday: birthday,
            }
            axios.post(`${srv}/updateUser`, payload)
            .then((res) => window.location.reload())
        }   
    }

    

    return (
        <div>
            <Modal isOpen={open} toggle={toggle} >
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name:</Label>
                            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required type="text" name="firstn" id="firstn" />    
                        </FormGroup>

                        <FormGroup>
                            <Label for="lastName">Last Name:</Label>
                            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required type="text" name="lastn" id="lastn"  />    
                        </FormGroup>

                        <div className={cssModule.dateContainer}>
                            <Label for="birthday">Birthday</Label>
                            <DatePicker required className={cssModule.datePick} onChange={setBirthday} value={birthday} />

                        </div>

                        <FormGroup>
                            <Label for="pw">Password</Label>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" name="pw" id="pw" />    
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleSelect">Gender</Label>
                            <Input value={gender === 0 ? "Male" : "Female"} onChange={(e) => e.target.value === "Male" ? setGender(0) : setGender(1)} required type="select" name="select" id="exampleSelect">
                                <option>Male</option>
                                <option>Female</option>   
                            </Input>
                        </FormGroup>
                        <Button type="submit" color="primary">Submit</Button>{' '}
                        <Button onClick={toggle} color="secondary">Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalComponent