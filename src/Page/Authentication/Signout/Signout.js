export const removeToken = () => { // export function from module 
    localStorage.clear();
    location.href = ("/");
}

