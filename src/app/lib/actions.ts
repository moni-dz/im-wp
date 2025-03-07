'use server';

export async function login(formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');
    const users = (await fetch('http://localhost:3000/api/v1/users')).json();
}

export async function deleteContract(id: number) {
    await fetch(`http://localhost:3000/api/v1/contracts?id=${id}`, { method: 'DELETE' });
}