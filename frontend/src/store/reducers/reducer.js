
const initialStore = {
    uploadedResume: null
}

const reducer = (state = initialStore, action) => {
    
    if (action.type === "UPLOADRESUME") {
            console.log("Uploading Resume to Props 3");
            console.log(action.payload);
        return {
            ...state,
            uploadedResume: action.payload
        }
    }

    return state;
}

export default reducer;