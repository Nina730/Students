import React, { useState, useEffect } from "react";
import { Card, Table, message, Checkbox, Button } from "antd";
import { Input, Form, } from "antd";
import axios from "axios";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },

};


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

const EditPageComponent = ({ student, onSuccess, onBack }) => {


    const getDate = () => {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear();
        return datetime;

    }
    const tableColumns = [

        {
            title: "Lenda ",
            dataIndex: "name"
        },
        {
            title: "Subscribe",
            dataIndex: "subscribed",
            key: "subscribed"
            , align: "center",
            render: (value, record, rowIndex) => (
                <Checkbox
                    checked={value}
                    onChange={handleCheckboxChangeFactory(rowIndex, "subscribed")}
                />
            )
        },

        {
            title: "Data",
            dataIndex: "subscribedDate"
        },
        {
            title: "Info te tjera",
            dataIndex: "otherInfo"

        },

    ];
    const [form] = Form.useForm();

    const [checkboxState, setCheckboxState] = useState(student.courses);

    const handleCheckboxChangeFactory = (rowIndex, columnKey) => event => {
        const newCheckboxState = [...student.courses];
        newCheckboxState[rowIndex][columnKey] = event.target.checked;
        if (event.target.checked === true) {
            let date = getDate();
            newCheckboxState[rowIndex].subscribedDate = date;
            setCheckboxState(newCheckboxState);

        }
        if (event.target.checked === false) {
            newCheckboxState[rowIndex].subscribedDate = "";
            setCheckboxState(newCheckboxState);

        }

        setCheckboxState(newCheckboxState);
    };


    useEffect(() => {
        form.setFieldsValue({
            NID: student.NID,
            name: student.name,
            surname: student.surname,
            grade: student.grade,
            profession: student.profession,
            education: student.education,
            password: student.password

        });

    }, [student]);

    const formatRequestData = (data) => {
        const requestData = {
            NID: data.NID,
            name: data.name,
            surname: data.surname,
            grade: data.grade,
            profession: data.profession,
            education: data.education,
            password: data.password,
            courses: checkboxState
        }
        return requestData;
    }
    const EditStudent = (e) => {
        form
            .validateFields()
            .then((data) => {
                const requestData = formatRequestData(data);
                axios.put(`http://localhost:3000/students/${student.id}`, requestData)
                    .then((res) => {
                        message.success('Modifikimi u krye me sukses')
                    })

                onSuccess();
            }
            )
    }
    return (
        <div>

            <div className="container" style={{ paddingTop: "2%" }}>
                <Card bodyStyle={{ margin: "20px" }}>

                    <h2 style={{ textAlign: "center" }}><b>
                        Ju jeni duke modifikuar te dhenat e studentit</b></h2><br></br>
                    <div>
                        <div class="ant-row">
                            <div class="ant-col ant-col-xs-24 ant-col-sm-10">
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="advanced_search"
                                    className="ant-advanced-search-form"
                                >
                                    <Form.Item name="NID" label="NID " rules={rules.nid}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <Form.Item name="name" label="EMER " rules={rules.name}>
                                        <Input type="text" />
                                    </Form.Item>

                                    <Form.Item name="surname" label="MBIEMER " rules={rules.surname}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <Form.Item name="grade" label="NOTA MESATARE" rules={rules.name}>
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item name="profession" label="PROFESIONI I DESHIRUAR" rules={rules.name}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <Form.Item name="education" label="EDUKIMI" rules={rules.name}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <Form.Item name="password" label="FJALEKALIMI" rules={rules.password}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <div >
                                        <Button
                                            style={{ marginRight: "5px" }}
                                            type="primary"
                                            icon={<SaveOutlined />}

                                            onClick={() => EditStudent()}
                                            size="large"
                                        >
                                            Ruaj
                                        </Button>
                                        <Button
                                            size="large"
                                            icon={<CloseOutlined />}
                                            type="danger"
                                            onClick={() => onBack()}
                                        >
                                            Anullo
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                            <div class="ant-col ant-col-xs-24 ant-col-sm-14">
                                <div class="ant-row design-mini-panels" style={{ paddingTop: "30px" }}>
                                    <div class="ant-col ant-col-xs-24 ant-col-sm-1">

                                    </div>
                                    <div class="ant-col ant-col-xs-24 ant-col-sm-22">

                                        <div className="table-responsive">
                                            <Table
                                                columns={tableColumns}
                                                rowKey="id"
                                                bordered="true"
                                                dataSource={student.courses}
                                                pagination={false}

                                                size="small" />
                                        </div>
                                    </div>
                                    <div class="ant-col ant-col-xs-24 ant-col-sm-1">
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>
                </Card>

            </div>
        </div>
    );
}

export default EditPageComponent;
