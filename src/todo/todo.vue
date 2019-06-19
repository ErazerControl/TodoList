<template>
    <section class="real-app">
        <input type="text" class="add-input"  placeholder="要做的事" @keyup.enter="addTodo">
        <Item v-for="todo in filterTodos" :key="todo.id" :todo="todo" @del="deleteTodo"></Item>
        <Tab :filter="filter" :todos="todos" @changeTab="onchangeTab" @clear="onclear"></Tab>
    </section>
</template>
<script>
import Item from '../todo/item.vue'
import Tab from '../todo/tab.vue'
let id=0
export default {
    data() {
        return {
            todos:[],
            filter:'all'
        }
    },
    computed:{
        filterTodos(){
            if(this.filter === 'all')
            {
                return this.todos
            }
            let completed=this.filter === 'completed'
            return this.todos.filter(todo => todo.completed===completed)
        }
    },
    components:{
        Item,
        Tab
    },
    methods: {
        addTodo(e) {
            this.todos.unshift({
                id:id++,
                content:e.target.value,
                completed:false
            })
            e.target.value=''
        },
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
        },
        onchangeTab(state){
            this.filter=state
        },
        onclear(){
            this.todos=this.todos.filter(todo => todo.completed === false)
        }
    }
}
</script>
<style lang="stylus" scoped>
.real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 20px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>