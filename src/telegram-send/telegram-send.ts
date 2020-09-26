import https from 'https'
import querystring from 'querystring'

export class Telegram {
    readonly token: string
    chatID?: string

    constructor(token: string, chatID?: string) {
        this.token = token
        this.chatID = chatID
    }

    async send(message: string, chatID?: string) {
        return new Promise((reject) => {
            chatID = chatID ?? this.chatID
            
            if (!chatID) {
                reject(`Do not have 'chatID' to send message to`)
            }

            return this.request(this.token, message, chatID)
        })
    }

    private async request(token: string, message: string, chatID: string) {
        return new Promise((resolve, reject) => {
            const baseUrl = `https://api.telegram.org/bot${token}`
            const urlParams = querystring.stringify({
                chat_id: chatID,
                text: message,
                parse_mode: 'HTML'
            })

            const url = `${baseUrl}/sendMessage?${urlParams}`

            https.get(url, (res: any) => res.statusCode === 200 ? resolve() : reject(res))
            .on('error', reject)
        })
    }
}