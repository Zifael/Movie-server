const nodemailer = require('nodemailer')


class MailService {
    private transporter: any
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST as string,
            port: process.env.SMPT_PORT as string,
            secure: false,
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMPT_PASSWORD
            }
        })
    }

    async sendActivationMail(to: string, link: string) {                
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: 'account activation on ' + process.env.API_URL,
            text: '',
            html: 
                `
                    <div>
                        <h1>To activate your account, follow the link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendResetPasswordMail(to: string, link: string, login: string) {
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: 'Reset password',
            html: 
                `
                    <div>
                        <h1>Hi ${login}</h1>
                        <h2>To reset to a password, click on the link</h2>
                        <a href="${link}">Reset password</a>
                    </div>                
                `
        })
    }
}

export const mailService = new MailService()