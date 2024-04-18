const mockUsers = {
    staff: {
        username: 'staff@staff.com',
        password: 'staff',
        role: 'staff',
    },
    user: {
        username: 'user@user.com',
        password: 'user',
        role: 'user',
    },
};

let currentUser = null;

export const signIn = async (email, password) => {
    console.log('Attempting sign-in with email:', email, 'and password:', password);

    const user = Object.values(mockUsers).find(u => u.username === email);
    console.log('Found user:', user);

    if (user && user.password === password) {
        // If the user exists and the password matches, return the user object
        console.log('Sign-in successful for user:', user);
        return { user: { id: '123', email: user.username, role: user.role } };
    } else {
        // If the email or password is invalid, throw an error
        console.error('Sign-in failed. Invalid email or password');
        throw new Error('Invalid email or password');
    }
};

export const signOut = async () => {
    currentUser = null;
};

export const getCurrentUser = () => currentUser;
