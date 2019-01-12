
const initialStore = {
    mingraphjobs : null

}

const reducer_mingraph = (state = initialStore, action) => {

    if (action.type === "GET_GRAPH_DATA" && action.statusCode == 200)
    {
        console.log(action.payload)
        return {
            ...state,
            mingraphjobs : action.payload

        }
    }

    return state;
}

export default reducer_mingraph;