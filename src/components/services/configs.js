// This function is for retrieving the origin of the userdata from localstorage i,e used throughout the application
export function resolveUserData() {
    let data = localStorage.getItem("userData");
    data = JSON.parse(data);
    return data;
}
// This function is for retrieving the role of the user from localstorage i,e used throughout the application
export function resolveUserRole() {
    let data = localStorage.getItem("userData");
    data = JSON.parse(data);
    return data.role;
}

// This function is for retrieving the role of the user from localstorage i,e used throughout the application
export function resolveUserMail() {
    let data;
    let manager = null;
    if((localStorage.getItem("userData")) !== null) {
        data = JSON.parse(localStorage.getItem("userData"));
        if (data.role === "Manager") {
            manager=data.mail;
        } else {
            manager=null;
        }
    } else {
        manager=null;
    };
    
    return manager;
}

export function resolveOrigin() {
    // let origin = process.env.REACT_APP_API
    let origin = "http://localhost:5001/api";
    return origin;
}