import { accessToken, refreshToken } from "../../config/helper"

export const signInAction = (data, donotSetLocalVar = false) => {
    if (!donotSetLocalVar) {
        accessToken.set(data.accessToken)
        refreshToken.set(data.refreshToken)
        
    }

    return {
        type: "SIGN_IN",
        value: data
    }
}

export const signOutAction = () => {
    accessToken.remove()
    refreshToken.remove()
    

    return {
        type: "SIGN_OUT",
    }
}