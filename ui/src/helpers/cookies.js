export function get(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

export function set(name, value) {
    document.cookie = name + "=" + value + ";path=/";
}