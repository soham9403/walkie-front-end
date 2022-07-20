

const initialState = {
    data: {},
    isLoggedIn: false,
    role: 0
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_IN": return { ...state, data: action.value, isLoggedIn: true, role: 0 };
        case "SIGN_OUT": return { ...state, data: {}, isLoggedIn: false, role: 0 };
        default: return { ...state }
    }
}
export default userReducer