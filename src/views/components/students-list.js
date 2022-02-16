import React from "react";
import { Card, Table, Tooltip, Button, message } from "antd";
import { EditOutlined, DeleteOutlined, } from "@ant-design/icons";
import 'antd/dist/antd.css';
import { Modal } from "antd";
import axios from "axios";

const StudentsListComponent = ({ dispatch, students, onSuccess }) => {


    const startEditStudent = (item) => {
        const action = {
            type: "open_edit_view",
            payload: {
                item: item,
                indexVisibility: 3
            }
        };
        dispatch(action);
    }

    const { confirm } = Modal;

    const showDeleteModal = (item) => {
        confirm({
            title: "Je i sigurte qe do ta fshish kete student?",
            okText: "Po",
            okType: "danger",
            cancelText: "Jo",
            onOk() {
                axios.delete(`http://localhost:3000/students/${item.id}`)
                    .then((res) => {
                        message
                            .success("Fshirja u krye me sukses!", 1)
                            .then(() => onSuccess());
                    })
                    .catch((err) => {
                        const errorMessage = err.response.data.Error
                            ? err.response.data.Error
                            : "Nje gabim ndodhi gjate fshirjes";
                        message.error(errorMessage, 2);
                    });
            },

            onCancel() { },
        });
    };
    const tableColumns = [
        {
            title: "Nr ",
            dataIndex: "id"
        },
        {
            title: "NID ",
            dataIndex: "NID"
        },
        {
            title: "Emri",
            dataIndex: "name"
        },
        {
            title: "Mbiemri",
            dataIndex: "surname"
        },
        {
            title: "Numri i lendeve te bera subscribe",
            dataIndex: "activeCourses"

        },

        {
            title: "Veprime",
            dataIndex: "actions",
            render: (_, elm) => (

                <div>

                    <Tooltip title="Modifiko">
                        <Button style={{ marginRight: "4px" }}
                            type="primary"
                            className="mr-4"
                            onClick={() => startEditStudent(elm)}
                            icon={<EditOutlined />}
                        />
                    </Tooltip>

                    <Tooltip title="Fshi">
                        <Button
                            danger
                            className="mr-4"
                            onClick={() => showDeleteModal(elm)}
                            icon={<DeleteOutlined />}
                            size="middle"
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (

        <Card bodyStyle={{ padding: "40px" }}>
            <div class="ant-row design-mini-panels">
                <div class="ant-col ant-col-xs-24 ant-col-sm-1">

                </div>
                <div class="ant-col ant-col-xs-24 ant-col-sm-22">

                    <div className="table-responsive">
                        <Table
                            columns={tableColumns}
                            rowKey="id"
                            bordered="true"
                            dataSource={students}
                            size="small" />
                    </div>
                </div>
                <div class="ant-col ant-col-xs-24 ant-col-sm-1">
                </div>

            </div>
        </Card>
    );
}

export default StudentsListComponent;
