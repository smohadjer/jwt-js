import {SignJWT} from 'jose';

export default async (req, res) => {
  const {username, password} = req.body;

  if (username === 'admin' && password === 'test') {
    const secret = new TextEncoder().encode('mySecret');
    const alg = 'HS256';
    const token = await new SignJWT({ 'username': username })
      .setProtectedHeader({ alg })
      .setExpirationTime('1h')
      .sign(secret);

    res.json({
      "access_token": token
    });
  } else {
    res.status(403).end();
  }
}
