// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { makeId } from '../../../../../../../CaEveNov24-Materials/Lesson36-React4-Dynamic&Children&More/react-inClass-cars/services/util.service.js'

const MAIL_KEY = 'mailDB'
_createMails()
// console.log('mails:', mails)

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getLoggedInUser,
    getDefaultFilter,
    getFilterFromSearchParams,

}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.sentAt) {
                mails = mails.filter(mail => mail.sentAt >= filterBy.sentAt)
            }
            // console.log(' mails:', mails)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(mail => {
        mail = _setNextPrevMailId(mail)
        return mail
    })
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    const mail = {
        id: makeId(),
        createdAt: new Date(),
        subject: '',
        body: '',
        isRead: Math.random() > 0.7,
        sentAt: null,
        removedAt: null,
        from: 'user@appsus.com',
        to: ''
    }
    return mail 
}

function getDefaultFilter() {
    return { txt: '', sentAt:'' }
}

function getLoggedInUser() {
    return {
        email: 'user@appsus.com',
        fullname: 'Yulia Appsus'
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                createdAt: 1717332000000, // 2024-06-02 12:00:00
                subject: 'Miss you!',
                body: 'Would love to catch up sometime.',
                isRead: Math.random() > 0.7,
                sentAt: 1717332180000, // 2024-06-02 12:03:00
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                createdAt: 1715436000000, // 2024-05-11 10:00:00
                subject: 'Project Update',
                body: 'The project is on track for next week.',
                isRead: Math.random() > 0.7,
                sentAt: 1715436240000, // 2024-05-11 10:04:00
                removedAt: null,
                from: 'alice@work.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                createdAt: 1713705600000, // 2024-04-21 00:00:00
                subject: 'Invitation',
                body: 'You are invited to our annual event.',
                isRead: Math.random() > 0.7,
                sentAt: 1713705780000, // 2024-04-21 00:03:00
                removedAt: null,
                from: 'events@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                createdAt: 1719484800000, // 2024-07-28 00:00:00
                subject: 'Sale Alert!',
                body: 'Don\'t miss our summer sale.',
                isRead: Math.random() > 0.7,
                sentAt: 1719485100000, // 2024-07-28 00:05:00
                removedAt: null,
                from: 'sales@shop.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                createdAt: 1718284800000, // 2024-06-13 00:00:00
                subject: 'Your Invoice',
                body: 'Please find attached your invoice.',
                isRead: Math.random() > 0.7,
                sentAt: 1718284980000, // 2024-06-13 00:03:00
                removedAt: null,
                from: 'billing@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e106',
                createdAt: 1715954400000, // 2024-05-17 12:00:00
                subject: 'Weekly Newsletter',
                body: 'Here is your weekly newsletter.',
                isRead: Math.random() > 0.7,
                sentAt: 1715954700000, // 2024-05-17 12:05:00
                removedAt: null,
                from: 'newsletter@news.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e107',
                createdAt: 1714579200000, // 2024-05-01 00:00:00
                subject: 'Appointment Reminder',
                body: 'Your appointment is scheduled for tomorrow.',
                isRead: Math.random() > 0.7,
                sentAt: 1714579500000, // 2024-05-01 00:05:00
                removedAt: null,
                from: 'appointments@clinic.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e108',
                createdAt: 1717843200000, // 2024-06-08 00:00:00
                subject: 'Flight Confirmation',
                body: 'Your flight has been booked.',
                isRead: Math.random() > 0.7,
                sentAt: 1717843440000, // 2024-06-08 00:04:00
                removedAt: null,
                from: 'flights@airline.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e109',
                createdAt: 1716643200000, // 2024-05-25 00:00:00
                subject: 'Password Reset',
                body: 'Click here to reset your password.',
                isRead: Math.random() > 0.7,
                sentAt: 1716643500000, // 2024-05-25 00:05:00
                removedAt: null,
                from: 'support@web.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e110',
                createdAt: 1719062400000, // 2024-07-23 00:00:00
                subject: 'Welcome!',
                body: 'Thanks for signing up!',
                isRead: Math.random() > 0.7,
                sentAt: 1719062580000, // 2024-07-23 00:03:00
                removedAt: null,
                from: 'welcome@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e111',
                createdAt: 1714915200000, // 2024-05-05 00:00:00
                subject: 'Job Application',
                body: 'We have received your application.',
                isRead: Math.random() > 0.7,
                sentAt: 1714915500000, // 2024-05-05 00:05:00
                removedAt: null,
                from: 'hr@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e112',
                createdAt: 1718198400000, // 2024-06-12 00:00:00
                subject: 'Order Shipped',
                body: 'Your order is on its way.',
                isRead: Math.random() > 0.7,
                sentAt: 1718198580000, // 2024-06-12 00:03:00
                removedAt: null,
                from: 'orders@shop.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e113',
                createdAt: 1717335600000, // 2024-06-02 13:00:00
                subject: 'Feedback Request',
                body: 'Please let us know how we did.',
                isRead: Math.random() > 0.7,
                sentAt: 1717335900000, // 2024-06-02 13:05:00
                removedAt: null,
                from: 'feedback@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e114',
                createdAt: 1715958000000, // 2024-05-17 13:00:00
                subject: 'Subscription Expiring',
                body: 'Your subscription will expire soon.',
                isRead: Math.random() > 0.7,
                sentAt: 1715958180000, // 2024-05-17 13:03:00
                removedAt: null,
                from: 'subscriptions@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e115',
                createdAt: 1713709200000, // 2024-04-21 01:00:00
                subject: 'Event Reminder',
                body: 'Don\'t forget the event tomorrow.',
                isRead: Math.random() > 0.7,
                sentAt: 1713709500000, // 2024-04-21 01:05:00
                removedAt: null,
                from: 'events@calendar.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e116',
                createdAt: 1719488400000, // 2024-07-28 01:00:00
                subject: 'Security Alert',
                body: 'A new login to your account was detected.',
                isRead: Math.random() > 0.7,
                sentAt: 1719488580000, // 2024-07-28 01:03:00
                removedAt: null,
                from: 'security@web.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e117',
                createdAt: 1718288400000, // 2024-06-13 01:00:00
                subject: 'Payment Received',
                body: 'Your payment has been processed.',
                isRead: Math.random() > 0.7,
                sentAt: 1718288700000, // 2024-06-13 01:05:00
                removedAt: null,
                from: 'payments@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e118',
                createdAt: 1715950800000, // 2024-05-17 10:00:00
                subject: 'Account Update',
                body: 'Your account information has been updated.',
                isRead: Math.random() > 0.7,
                sentAt: 1715951040000, // 2024-05-17 10:04:00
                removedAt: null,
                from: 'accounts@web.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e119',
                createdAt: 1714575600000, // 2024-04-30 23:00:00
                subject: 'Holiday Greetings',
                body: 'Wishing you a wonderful holiday season!',
                isRead: Math.random() > 0.7,
                sentAt: 1714575900000, // 2024-04-30 23:05:00
                removedAt: null,
                from: 'greetings@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e120',
                createdAt: 1717846800000, // 2024-06-08 01:00:00
                subject: 'Survey Invitation',
                body: 'Please participate in our survey.',
                isRead: Math.random() > 0.7,
                sentAt: 1717846980000, // 2024-06-08 01:03:00
                removedAt: null,
                from: 'survey@service.com',
                to: 'user@appsus.com'
            },
        ]
        utilService.saveToStorage(MAIL_KEY, mails)

    }
    return mails
}


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    // const minSpeed = searchParams.get('minSpeed') || ''

    return {
        txt,
    }
}


function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}



