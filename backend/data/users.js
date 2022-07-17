import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'a@a.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: true
    },
    {
        name: 'Mahmoud',
        email: 'm@a.com',
        password: bcrypt.hashSync('123', 10),
    },
]

export default users