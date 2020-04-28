import request from '@/utils/request'

export function getOrder(data) {
    return request({
        url: 'order/getOrder',
        method: 'post',
        data: {
            skip: data.skip,
            limit: data.limit,
            ...data
        }
    })
}

export function getOrderByTime() {
    return request({
        url: 'order/getOrderByTime',
        method: 'get',
        params: {

        }
    })
}

export function delOrder(data) {
    return request({
        url: 'order/delOrder',
        method: 'post',
        data: {
            orderId: data,
            ...data
        }
    })
}
