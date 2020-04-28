import request from '@/utils/request'

export function getType() {
    return request({
        url: 'type/getTypes',
        method: 'get',
        data: {

        }
    })
}
export function getCount() {
    return request({
        url: 'type/getCount',
        method: 'get',
        data: {

        }
    })
}

export function getShop(data) {
    return request({
        url: 'product/getProductsByAll',
        method: 'post',
        data: {
            name: data.name,
            typeId: data.phone,
            skip: data.skip,
            limit: data.limit,
            ...data
        }
    })
}

export function delShop(data) {
    return request({
        url: 'product/delShop',
        method: 'post',
        data: {
            shopId: data,
            ...data
        }
    })
}
