
export const initialState = {
    students: [],
    indexVisibility: 0,
    refreshIndex: 0,
    itemSelected: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_index_visibility":
            return { ...state, indexVisibility: action.payload };
        case "set_students":
            return { ...state, students: action.payload.students };
        case "open_edit_view":
            return { ...state, itemSelected: action.payload.item, indexVisibility: action.payload.indexVisibility };

    }
}