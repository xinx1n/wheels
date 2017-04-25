window.bom = {
    openAtCenter: function(width, height, url) {
        console.log(screen.width)
        console.log(screen.height)
        let mposition = `
          width=${width}px,height=${height}px,
          screenX=${screen.width/2 - width/2}px,
          screenY=${screen.height/2 - height/2}px
         `
        window.open(url, 'mcenter', mposition)
    },

    search: function(name, value) {
        let searchAll = function() {
            let result = {}
            let search = window.location.search
            if (search[0] === '?') {
                search = search.slice(1)
            }
            let searchArray = search.split('&').filter(function(item) {
            	return item!==null&&item!==''
            });
                // 遍历数组
            var len = searchArray.length
            for (var i = 0; i < len; i++) {
                let parts = searchArray[i].split('=')
                result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '')
            }
            return result
        }
        let result = searchAll()
        if (value === undefined) {
            return result[name]
        } else {
            result[name] = value
            let newSearch = '?'
            for (let key in result) {
                newSearch += `${encodeURIComponent(key)}=${encodeURIComponent(result[key])}&`
            }
            let endSearch = newSearch.slice(0, newSearch.length-1)
            location.search = endSearch
            // if (result[name] === undefined) {
            //     location.search += `&${encodeURIComponent(name)}=${encodeURIComponent(value)}`
            // } else {
            // }
        }
    }
}
