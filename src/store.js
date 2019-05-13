import json from './datas.json'

var store = {
    actual: 0,
    tree: json,
    setActual(id){
        this.actual = id;
    }
} ;

export default store;