export const areaDataHandler = (res) => {
    let options = res.map(item => {
        let option = {
            value: item.areaCode,
            label: item.areaName,
            children: [],
        }
        if (item.subArea.length > 0) {
            option.children = item.subArea.map(_item =>
                ({
                    value: _item.areaCode,
                    label: _item.areaName,
                })
            )
        } else {
            option.children.push({
                value: '',
                label: '全部',
            })
        }
        return option
    })
    return options
}

export default {
    //对象深复制
    deepCopy(obj) {
        var newObj = obj.constructor === Array ? [] : {};
        newObj.constructor = obj.constructor;
        if (typeof obj !== "object") {
            return obj;
        } else if (window.JSON) {
            //若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
            newObj = JSON.parse(JSON.stringify(obj));
        } else {
            for (var prop in obj) {
                if (obj[prop].constructor === RegExp || obj[prop].constructor === Date) {
                    newObj[prop] = obj[prop];
                } else if (typeof obj[prop] === 'object') {
                    //递归
                    newObj[prop] = deepCopy(obj[prop]);
                } else {
                    newObj[prop] = obj[prop];
                }
            }
        }
        return newObj;
    }
}