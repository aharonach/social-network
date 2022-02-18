import * as cookies from "./cookies.js";

export async function do_post(url, data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify({ token: cookies.get('token') }),
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return check_auth(result) && result;
}

export async function do_get(url, data = {}) {
    const final_url = data && Object.keys(data).length === 0 ? url : url + '?' + (new URLSearchParams(data).toString());
    const response = await fetch(final_url, {
        headers: {
            'Authorization': JSON.stringify({ token: cookies.get('token') })
        }
    });

    const result = await response.json();
    return check_auth(result) && result;
}

export async function do_delete(url, data = {}) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': JSON.stringify({ token: cookies.get('token') }),
        }
    });

    const result = await response.json();
    return check_auth(result) && result;
}

export async function fetch_messages() {
    const data = await do_get('/api/user/messages?orderby=datetime&order=desc');
    return data?.error ? [] : data;
}

export async function fetch_posts() {
    const data = await do_get('/api/posts?orderby=datetime&order=desc');
    return data?.error ? [] : data;
}

function check_auth(response) {
    if (response?.error && response?.error.toLowerCase().includes('authentication failed')) {
        throw new Error("Token expired. please login again.");
    }

    return true;
}