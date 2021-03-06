import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            memo: []
        }),
        mutations: {
            insert: function(state, obj) {
                var d = new Date();
                var fmt = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + ('00' + d.getMinutes()).slice(-2);
                state.memo.unshift({
                    title: obj.title,
                    content: obj.content,
                    created: fmt
                })
            },
            remove: function(state, obj) {
                var num = 0;
                for(let i = 0; i < state.memo.length; i++) {
                    const ob = state.memo[i];
                    if(ob.title == obj.title && ob.content == obj.content && ob.created == obj.created) {
                        alert('remove it! --' + ob.title);
                        state.memo.splice(i, 1);
                        return;
                    }
                }
            }
        }
    })
}

export default createStore