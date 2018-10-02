<template>
    <li id="todo" class="list-item">

        <div class="list-item-check-box">
            <button class="list-item-check pointer"
                :class="[todo.IS_COMPLETE === 1 ? 'active' : '']"
                @click="changeTodoStatus"
            ></button>
        </div>
        <div class="list-item-contents" :class="[todo.IS_COMPLETE === 1 ? 'active' : '']">
            {{ todo.CONTENT }}
        </div>
        <div class="list-item-edit-btn-box"
            @click="toggleEdit"
        >
            <button class="list-item-edit-btn pointer">
                <i class="list-item-edit-btn-icon material-icons">more_vert</i>
            </button>
        </div>

        <transition name="slideRight">
          <div class="list-item-option-box"
            v-if="edit"
          >
            <div class="list-item-option-btn-bundle">

            </div>
          </div>
        </transition>

    </li>
</template>
<script type="text/javascript" src="./js/todoIndex.js"></script>
<style type="text/css" src="./css/todoIndex.css"></style>