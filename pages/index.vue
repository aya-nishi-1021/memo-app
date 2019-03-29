<template>
    <section class="container">
        <h1>memo</h1>
        <table>
            <tbody>
                <tr>
                    <th>Title</th>
                    <td>
                        <input type="text" name="title" class="title" size="40" v-model="title" @focus="set_flg"/>
                        <button @click="find">find</button>
                    </td>
                </tr>
                <tr>
                    <th>Memo</th>
                    <td><textarea name="content" class="content" cols="50" rows="5" v-model="content"></textarea></td>
                </tr>
                <tr>
                    <th></th>
                    <td>
                        <button @click="insert">save</button>
                        <button v-if="sel_flg != false" @click="remove">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr>
        <ul class="list">
            <li v-for="(item, index) in display_items" :key="index">
                <span @click="select(item)">{{item.title}} {{item.created}}</span>
            </li>
        </ul>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data: function() {
        return {
            title: '',
            content: '',
            // 検索実行中かどうか
            find_flg: false,
            // 項目を選択した状態かどうか
            sel_flg: false
        }
    },
    computed: {
        ...mapState(['memo']),
        ...mapState(['page']),
        display_items: function() {
            if(this.find_flg) {
                var arr = [];
                var data = this.memo;
                data.forEach(element => {
                    if(element.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0) {
                        arr.push(element);
                    }
                });
                return arr;
            } else if(this.sel_flg != false) {
                return [this.sel_flg];
            } else {
                return this.memo;
            }
        },  
    },
    methods: {
        // 検索中か選択中の場合はtitleとcontentを空にする
        set_flg: function() {
            if(this.find_flg || this.sel_flg != false) {
                this.find_flg = false;
                this.sel_flg = false;
                this.title = '';
                this.content = '';
            }
        },
        insert: function() {
            this.$store.commit('insert', {title: this.title, content: this.content});
            this.title = '';
            this.content = '';
        },
        select: function(item) {
            this.find_flg = false;
            this.sel_flg = item;
            this.title = item.title;
            this.content = item.content;
        },
        remove: function() {
            if(this.sel_flg == false) {
                return;
            } else {
                this.$store.commit('remove', this.sel_flg);
                this.set_flg();
            }
        },
        find: function() {
            this.sel_flg = false;
            this.find_flg = true;
        }
    }
}
</script>