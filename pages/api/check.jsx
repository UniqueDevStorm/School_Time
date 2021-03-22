import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = new Cookies(req, res);
        const token = jwt.sign({'Sign': true}, 'seokgwanms')
        cookies.set('token', token, {
            httpOnly: false
        })
        res.status(200).end()
    } else {
        res.status(405).end();
    }
}