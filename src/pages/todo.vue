<script setup>
// initalize client for trpc
const { $client } = useNuxtApp();

// reference to html elements
const todoText = ref('');
const todoNumber = ref(999);
const buttonText = ref('Submit');

// CRUD for Todos
const createTodo = useMutation(['create-todo'], $client.createTodo.mutate);
const todos = useQuery(['todos'], () => $client.getTodos.query());
const updateTodo = useMutation(['update-todo'], $client.updateTodo.mutate);
const deleteTodo = useMutation(['delete-todo'], $client.deleteTodo.mutate);

// on form submit or form update
async function handleSubmit() {
  if (todoNumber.value === 999)
    await createTodo.mutateAsync({
      text: todoText.value
    });
  else
    await updateTodo.mutateAsync({
      id: todoNumber.value,
      text: todoText.value
    });

  // get todos
  todos.refetch();
  // set values back to default
  todoText.value = '';
  todoNumber.value = 999;
  buttonText.value = 'Submit';
}

// Delete todo button handle
async function handleDeleteTodoClick(todoID) {
  await deleteTodo.mutateAsync({
    id: todoID
  });
  todos.refetch();
}

// edit todo button handle
function handleEditTodoCLick(todoID, updatedTodoString) {
  todoText.value = updatedTodoString;
  todoNumber.value = todoID;
  buttonText.value = 'Update';
}

// for typescript, so there isnt an error for todos being empty
const myTodos = computed(() => todos.data.value ?? []);
</script>

<template>
  <!-- source: https://codepen.io/soufiane-khalfaoui-hassani/pen/LYpPWda -->
  <div class="login-box">
    <h2>Todo</h2>
    <form @submit.prevent="handleSubmit">
      <div class="user-box">
        <input type="text" required v-model="todoText" />
        <label>Enter Todo</label>
      </div>
      <div class="user-box" v-show="false">
        <input type="text" v-model="todoNumber" v-show="false" />

        <label v-show="false">ID number</label>
      </div>
      <button href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ buttonText }}
      </button>
    </form>
  </div>

  <br />
  <div class="todo-box" style="width='800px'">
    <ol>
      <li v-for="todo in myTodos" :key="todo.id" class="list-todo">
        {{ todo.text }}
        <button @click="handleDeleteTodoClick(todo.id)">Delete Todo</button>
        <button @click="handleEditTodoCLick(todo.id, todo.text)">
          Edit Todo
        </button>
      </li>
    </ol>
  </div>
</template>

<style lang="postcss" scoped>
@import 'open-props/media';

section {
  width: 100%;
  max-width: var(--size-lg);
  margin-inline: auto;
}
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: relative;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.todo-box {
  position: relative;
  top: 50%;
  left: 50%;
  width: 800px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}
.todo-box button {
  float: right;
  margin-right: 8px;
  margin-left: 8px;
  color: #2ef3fc;
}
.list-todo {
  margin-top: 8px;
  margin-bottom: 8px;
  border-color: #03f487;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
