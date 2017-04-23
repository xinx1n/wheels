window.$ = function (selectorOrNode) {
	let array = []
	if(typeof selectorOrNode === 'string'){
		let items = document.querySelectorAll(selectorOrNode)
		array.push(...items)
	}else if (selectorOrNode instanceof Element) {
		array.push(selectorOrNode)
	}else if (selectorOrNode instanceof Array) {
		let i,len = selectorOrNode.length
		for(i=0;i<len;i++){
			if(selectorOrNode[i] instanceof Element){
				array.push(selectorOrNode[i])
			}
		}
	}

	array.on = function (eventType,fn) {
		array.forEach(function (el) {
			el.addEventListener(eventType, fn)
		})
		return array
	}
	array.addClass = function (className) {
		let names = $._GetClassNameList(className)
		array.forEach(function (el) {
			// el.classList.add.apply(el.classList,names)
			el.classList.add(...names)
		})
		return array
	}

	array.removeClass = function (className) {
		let names = $._GetClassNameList(className)
		array.forEach(function (el) {
			el.classList.remove(...names)
		})
		return array
	}
	array.text = function (value) {
		if(value!==undefined){
			array.forEach(function(el){
				el.textContent = value
			})	
			return array
		}else{
			let texts = []
			array.forEach(function(el){
				texts.push(el.innerText)
			})
			return texts	
		}
	}
	array.get = function (index) {
        return array[index]
    }
    array.siblings = function () {
    	let current = array[0]
    	let childrenArr = current.parentNode.children
    	let resultArr = []
    	resultArr = Array.prototype.filter.call(childrenArr,function (item) {
    		return item !== current
    	})
    	let result = $(resultArr)
    	result.previousSelection = array
    	return result
    }
    array.end = function () {
    	return array.previousSelection
    }
	return array
}
$._GetClassNameList = function (className) {
	return className.split(' ').filter(function(item) { return item!==''&&item!==null&&item!==undefined; })
}