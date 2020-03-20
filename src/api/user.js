import request from '@/utils/request'

export function getUser(data) {
    return request({
        url: 'user/getUser',
        method: 'post',
        data: {
            userName: data.name,
            phone: data.phone,
            sex: data.sex,
            skip: data.skip,
            limit: data.limit,
            ...data
        }
    })
}

export function delUser(data) {
    return request({
        url: 'user/delUser',
        method: 'post',
        data: {
            userId: data,
            ...data
        }
    })
}
export function editUser(data) {
    return request({
        url: 'user/editUser',
        method: 'post',
        data: {
            ...data
        }
    })
}
