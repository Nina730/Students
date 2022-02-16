import React, { useState} from "react";
import { Input,  Card,  Form, Button, message } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";



const rules = {
    nid: [
        {
            required: true,
            message: "Ju lutem, vendosni ID e studentit! ",
        },
    ],
    name: [
        {
            required: true,
            message: "Ju lutem, vendosni emrin e studentit! ",
        },
    ],
    surname: [
        {
            required: true,
            message: "Ju lutem, vendosni mbiemrin e studentit! ",
        },
    ],
    password: [
        {
            required: true,
            message: "Ju lutem, vendosni fjalekalimin! ",
        },

        ({ getFieldValue }) => ({

            validator(_, value) {
                if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Fjalekalimi nuk eshte ne formatin e duhur!'));


            },
        }),
    ],
};

const RegisterPageComponent = ({ students, onSuccess, onCancel }) => {

    const items = students.map((user) => {
        return {
            ...user
        }
    });
    
    const [form] = Form.useForm();

    const [courses, setCourses] = useState([{
        name: "Arte te vecanta",
        subscribed: false,
        subscribedDate: "",
        otherInfo: ""
    },
    {
        name: "Arte jo te vecanta",
        subscribed: false,
        subscribedDate: "",
        otherInfo: ""
    },
    {
        name: "Arte te thjeshta",
        subscribed: false,
        subscribedDate: "",
        otherInfo: ""
    }]);

    const formatRequestData = (data) => {
        const requestData = {
            NID: data.NID,
            name: data.name,
            surname: data.surname,
            grade: "",
            profession: "",
            education: "",
            password: data.password,
            courses: courses
        }
        return requestData;
    }

    const checkUser = (NID) => {
        let registered = items.some(i => i.NID.includes(NID));
        return registered;

    };

    const RegisterStudent = (e) => {

        form
            .validateFields()
            .then((data) => {
                const requestData = formatRequestData(data);
                const registered = checkUser(data.NID);
                if (registered === true) {
                    message.error('Ky student eshte i rregjistruar ne sistem!').then(()=>{
                        form.resetFields();
                    })
                    
                }
                else {
                    fetch('http://localhost:3000/students', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestData)
                    })
                        .then(res => res.json());
                    message.success('Rregjistrimi u krye me sukses')
                    onSuccess();
                }

            }
            )
    }

    return (
        <div>

            <div className="container" style={{ paddingTop: "2%" }}>
                <Card bodyStyle={{ margin: "20px" }}>
                    <div class="ant-row design-mini-panels">
                        <div class="ant-col ant-col-xs-24 ant-col-sm-6">

                        </div>
                        <div class="ant-col ant-col-xs-24 ant-col-sm-12">
                            <div>

                            </div>
                            <h2 style={{ textAlign: "center", marginBottom: "40px" }}><b> 
Plotesoni te dhenat e meposhtme per t’u rregjistruar ne sistemin e menaxhimit te studenteve:
                            </b></h2>                            <div>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="advanced_search"
                                    className="ant-advanced-search-form"
                                >
                                    <Form.Item name="NID" label="NID" rules={rules.nid}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <Form.Item name="name" label="EMER" rules={rules.name}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <Form.Item name="surname" label="MBIEMER" rules={rules.surname}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <Form.Item name="password" label="FJALEKALIMI" rules={rules.password}>
                                        <Input type="password" />
                                    </Form.Item>
                                    <div class="ant-row">
                                        <div class="ant-col ant-col-xs-24 ant-col-sm-6">
                                        </div>
                                        <div class="ant-col ant-col-xs-24 ant-col-sm-6">
                                            <Button
                                                type="primary"
                                                onClick={() => RegisterStudent()}
                                                icon={<SaveOutlined />}

                                            >
                                                Rregjistrohu
                                            </Button>

                                        </div>
                                        <div class="ant-col ant-col-xs-24 ant-col-sm-6">
                                            <Button
                                                type="danger"
                                                icon={<CloseOutlined />}

                                                onClick={() => onCancel()}

                                            >
                                                Anullo
                                            </Button>
                                        </div>
                                        <div class="ant-col ant-col-xs-24 ant-col-sm-6">

                                        </div>
                                    </div>

                                </Form>
                            </div>
                        </div>
                        <div class="ant-col ant-col-xs-24 ant-col-sm-6">

                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}

export default RegisterPageComponent;
