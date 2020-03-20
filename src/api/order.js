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
