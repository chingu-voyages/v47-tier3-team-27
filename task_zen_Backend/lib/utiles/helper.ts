import crypto from "crypto"

const SECRET_IK = 'mannn@io'


export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, passsword: string) => {
    return crypto.createHmac('sha256', [salt, passsword].join('/')).update(SECRET_IK).digest('hex')
}