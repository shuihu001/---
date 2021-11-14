function debounce(fun, wait) {
    let timer = null;

    return function (...args) {
        if (timer) clearTimeout(timer);
        timer =  setTimeout(() => {
                fun.apply(this, args)
            }, wait)

    }
}

function throttling(fun, wait) {
    let timer = null;

    return function (...args) {
        if (timer) return;
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, wait)
    }
}