<template>
    <div id="list" class="list-container">
        <div class="list-area">
            <ul class="list-item-box">
                <li class="list-item" v-for="todo in list">
                    <button class="list-item-check pointer" :class="[todo.IS_COMPLETE === 1 ? 'active' : '']"></button>
                    <div class="list-item-contents" :class="[todo.IS_COMPLETE === 1 ? 'active' : '']">
                        {{ todo.CONTENT }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript" src="./js/listIndex.js"></script>
<style type="text/css" src="./css/listIndex.css"></style>