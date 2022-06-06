import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  getToken({ req })
    .then(({ accessToken }) => res.status(200).send(accessToken))
    .catch((err) => res.status(500).send(err.message))
}
