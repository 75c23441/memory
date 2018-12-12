export class CheckType {
    constructor() {
    }

    isNull(param: any) {
        return !param;
    }

    isString(param: any) {
        if (!param) return false;
        return !!param && typeof(param) === 'string';
    }

    isNumber(param: any) {
        if (!param) return false;
        return  typeof(param) === 'number';
    }

    isObject(param: any) {
        if (!param) return false;
        return typeof(param) === 'object' && JSON.stringify(param)[0] === '{';
    }

    isArr(param: any) {
        if (!param) return false;
        return typeof(param) === 'object' && JSON.stringify(param)[0] === '[';
    }

    isFunction(param: any) {
        if (!param) return false;
        return typeof(param) === 'function';
    }
}
