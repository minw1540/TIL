<template>
    <div id="list" class="list-container">
        <div class="list-area">
            <div class="list-input-box">
                <input type="text"
                    class="list-input"
                    placeholder="+ add new To Do List"
                    v-model="newTodoInput"
                    @keyup.enter="addTodo"
                />
                <button class="list-input-btn pointer" @click="addTodo">
                    <i class="list-input-icon material-icons">save</i>
                </button>
            </div>

            <ul class="list-item-box">
                <todo v-for="todo in list" :todo="todo"></todo>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript" src="./js/listIndex.js"></script>
<style type="text/css" src="./css/listIndex.css"></style>