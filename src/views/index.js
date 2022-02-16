import React, { useState, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import EntryPageComponent from "./components/entry-page";
import StudentsListComponent from "./components/students-list";
import { PageHeader, Button } from 'antd';
import 'antd/dist/antd.css';
import RegisterPageComponent from "./components/register-page";
import EditPageComponent from "./components/edit-page";
import axios from 'axios';

const SystemComponent = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [listRefreshIndex, setListRefreshIndex] = useState(0);

    const user = localStorage.getItem('user');

    useEffect(() => {
        axios.get('http://localhost:3000/students')
            .then((res) => {
                const updatedStudents = res.data.map((item) => {
                    const activeCourses = item.courses.filter(item => item.subscribed === true)
                    return { ...item, activeCourses: activeCourses.length }
                });

                const action = {
                    type: "set_students",
                    payload: {
                        students: updatedStudents,
                    },
                };
                dispatch(action);
            })

    }, [listRefreshIndex]);


    const updateIndexVisibility = (indexVisibility) => {
        const action = {
            type: "set_index_visibility",
            payload: indexVisibility,
        };
        dispatch(action);
    };


    const refreshPage = () => {
        setListRefreshIndex(prevState => prevState + 1);
        updateIndexVisibility(0)

    };
    const onSuccess = () => {
        updateIndexVisibility(1);

    };

    const onSuccessEdit = () => {
        setListRefreshIndex(prevState => prevState + 1);
        updateIndexVisibility(1);

    }
    const onCancelEdit = () => {
        updateIndexVisibility(1);

    }
    const logOut = () => {
        localStorage.clear();
        setListRefreshIndex(prevState => prevState + 1);
        updateIndexVisibility(0)

    }
    return (
        <div>
            <  PageHeader
                className="site-page-header"
                title="Sistemi i menaxhimit te studenteve"
                extra={[
                    <Button key="3" onClick={() => updateIndexVisibility(0)}>Identifikohu</Button>,
                    <Button key="2" onClick={() => updateIndexVisibility(2)}>Rregjistrohu</Button>,
                    <Button key="2" disabled={true ? user == null : false} onClick={() => updateIndexVisibility(1)}>Studentet</Button>,
                    <Button key="2" disabled={true ? user == null : false} onClick={() => logOut()}>Dil</Button>,

                ]}
            />

            {state.indexVisibility == 0 && (
                <EntryPageComponent
                    state={state}
                    onSuccess={onSuccess}
                />
            )}

            {state.indexVisibility == 1 && (
                <StudentsListComponent
                    students={state.students}
                    dispatch={dispatch}
                    onSuccess={() => refreshPage()}

                />
            )}

            {state.indexVisibility == 2 && (
                <RegisterPageComponent
                    students={state.students}
                    onBack={() => updateIndexVisibility(0)}
                    onSuccess={() => refreshPage()}
                    onCancel={() => updateIndexVisibility(0)}
                />
            )}
            {state.indexVisibility == 3 && (
                <EditPageComponent
                    student={state.itemSelected}
                    onSuccess={() => onSuccessEdit()}
                    onBack={() => onCancelEdit()}
                />
            )}

        </div>
    );
}

export default SystemComponent;
