import React  from "react";
import { Input,  Card,  Image, Form, Button, message } from "antd";

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

    password: [
        {
            required: true,
            message: "Ju lutem, vendosni fjalekalimin! ",
        },

        ({ getFieldValue }) => ({
            validator(_, value) {
                if (value.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Fjalekalimi duhet te kete te pakten 8 karaktere!'));


            },
        }),
    ],
};
const EntryPageComponent = ({ state, onSuccess }) => {
    const [form] = Form.useForm();
    const user = localStorage.getItem('user');

    const Login = (e) => {
        form
            .validateFields()
            .then((value) => {
                fetch("http://localhost:3000/students?q=" + value.NID).then((data) => {
                    data.json().then((resp) => {


                        if (resp.length > 0) {

                            localStorage.setItem('user', value.NID);
                            message.success('Ju jeni loguar ne sistem')

                            onSuccess();
                        }
                        else {
                            alert('Please Check Your NID and Password')
                        }
                    })
                })
            })
    }

    return (
        <div>
            <div className="container" style={{ paddingTop: "2%" }}>
                <Card bodyStyle={{ margin: "20px" }}>
                    <div class="ant-row design-mini-panels"style={{rowGap:"10px"}}>
                        <div class="ant-col ant-col-xs-24 ant-col-sm-8">
                            <div>

                            </div>
                            <h3><b>
Plotesoni te dhenat e meposhtme per t’u identifikuar ne sistemin e menaxhimit te studenteve:</b></h3>
                            <div>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="advanced_search"
                                    className="ant-advanced-search-form"
                                >
                                    <Form.Item name="NID" label="NID " rules={rules.nid}>
                                        <Input type="text" />
                                    </Form.Item>
                                    <Form.Item name="password" label="FJALEKALIMI" rules={rules.password} >
                                        <Input type="password" />
                                    </Form.Item>
                                    <Button
                                        disabled={true ? user !== null : false}
                                        type="primary"
                                        onClick={() => Login()}
                                    >
                                        Identifikohu
                                    </Button>

                                </Form>
                            </div>
                        </div>
                        <div class="ant-col ant-col-xs-24 ant-col-sm-4">
                        </div>
                        <div class="ant-col ant-col-xs-24 ant-col-sm-12">
                            <Image
                                width={"100%"}
                                src="https://static.wixstatic.com/media/da73d02f0c124d16bc6f4ad456ce9b5f.jpg/v1/fill/w_490,h_852,fp_0.49_0.48,q_85,usm_0.66_1.00_0.01/da73d02f0c124d16bc6f4ad456ce9b5f.webp"
                                preview={false}
                            />
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}

export default EntryPageComponent;
