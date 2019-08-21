const axios = require('axios')

export const get_normal_qrcode = function (text, cb, errCb) {
    axios.post('/qrcode/normal', {
        text: text
    }).then(resp => {
        let d = resp.data
        if (d.code === 0) {
            cb(resp.data)
        } else {
            errCb(resp.data)
        }
    }).catch(err => {
        errCb(err)
    })

}


export const get_picture_qrcode = function (formData, cb, errCb) {
    axios.post('/qrcode/picture', formData).then(resp => {
        let d = resp.data
        if (d.code === 0) {
            cb(resp.data)
        } else {
            errCb(resp.data)
        }
    }).catch(err => {
        errCb(err)
    })

}

export const get_gif_qrcode = function (formData, cb, errCb) {
    axios.post('/qrcode/gif', formData).then(resp => {
        let d = resp.data
        if (d.code === 0) {
            cb(resp.data)
        } else {
            errCb(resp.data)
        }
    }).catch(err => {
        errCb(err)
    })

}
