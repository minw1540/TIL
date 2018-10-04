<template>
    <li id="todo" class="list-item">
        <div class="list-item-outer"
            :class="[todo.edit ? 'edit' : '']"
        >
            <div class="list-item-check-box">
                <button class="list-item-check pointer"
                    :class="[todo.IS_COMPLETE === 1 ? 'active' : '']"
                    @click="changeTodoStatus(todo.IS_COMPLETE === 1 ? 0 : 1)"
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
        </div>

        <transition name="slideRight">
            <div class="list-item-option"
                v-if="todo.edit"
            >

            <div class="list-item-edit-bundle">
                <div class="list-item-edit-input-box">
                    <input type="text"
                        class="list-item-edit-input"
                        v-model="todo.editText"
                        ref="editTextElem"
                        @keyup.enter="editTodoContent"
                    />

                    <button class="list-item-edit-save-btn pointer"
                        @click="editTodoContent"
                    >
                        <i class="list-item-edit-save-btn-icon material-icons">edit</i>
                    </button>
                </div>

                <button class="list-item-edit-delete-btn pointer"
                    @click="changeTodoStatus(3)"
                >
                    <i class="list-item-edit-delete-btn-icon material-icons">delete_forever</i>
                </button>
            </div>

            <div class="list-item-edit-btn-box"
                @click="toggleEdit"
            >
                <button class="list-item-edit-btn pointer">
                    <i class="list-item-edit-btn-icon material-icons">more_vert</i>
                </button>
            </div>
            </div>
        </transition>
    </li>
</template>
<script type="text/javascript" src="./js/todoIndex.js"></script>
<style type="text/css" src="./css/todoIndex.css"></style>