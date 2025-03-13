const checkExp = () => {
    const curTime = Date.now();
    const expTime = localStorage.getItem("exp");
    if (expTime && curTime > expTime) {
        localStorage.removeItem("user");
        localStorage.removeItem("exp");
        window.location.replace("/login");
        return false;
    }
    return true;
}

export const isAuth = () => {
    const item = localStorage.getItem("user") || "";
    if (item !== "" && checkExp()) {
        return true;
    }
    return false;
}

export const getUser = () => {
    if (isAuth()) {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    } else {
        return null;
    }
}