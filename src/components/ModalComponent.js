import {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap'
import DatePicker from 'react-date-picker';
import cssModule from './modal.module.css'

function ModalComponent({open, toggle}) {
    const [value, onChange] = useState(new Date());
    function handleSubmit() {
        return "Submit"
    }

    console.log(value);

    return (
        <div>
            <Modal isOpen={open} toggle={toggle} >
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name:</Label>
                            <Input required type="text" name="firstn" id="firstn" />    
                        </FormGroup>

                        <FormGroup>
                            <Label for="lastName">Last Name:</Label>
                            <Input required type="text" name="lastn" id="lastn"  />    
                        </FormGroup>

                        <div className={cssModule.dateContainer}>
                            <Label for="birthday">Birthday</Label>
                            <DatePicker required className={cssModule.datePick} onChange={onChange} value={value} />

                        </div>

                        <FormGroup>
                            <Label for="pw">Password</Label>
                            <Input required type="password" name="pw" id="pw" />    
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleSelect">Gender</Label>
                            <Input required type="select" name="select" id="exampleSelect">
                                <option>Male</option>
                                <option>Female</option>   
                            </Input>
                        </FormGroup>
                        <Button type="submit" color="primary">Do Something</Button>{' '}
                        <Button onClick={toggle} color="secondary">Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalComponent