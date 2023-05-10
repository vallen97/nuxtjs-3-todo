<script setup>
import { number } from 'zod';

const { $client } = useNuxtApp();

const todoText = ref('');
const todoNumber = ref(999);
const buttonText = ref('Submit');

const todos = useQuery(['todos'], () => $client.getTodos.query());
// const todos = await $client.getTodos.useQuery();

const createTodo = useMutation(['create-todo'], $client.createTodo.mutate);
const updateTodo = useMutation(['update-todo'], $client.updateTodo.mutate);
const deleteTodo = useMutation(['delete-todo'], $client.deleteTodo.mutate);

async function handleSubmit() {
  console.log('todo ID type: ', typeof todoNumber.value);
  if (todoNumber.value === 999)
    await createTodo.mutateAsync({
      text: todoText.value
    });
  else
    await updateTodo.mutateAsync({
      id: todoNumber.value,
      text: todoText.value
    });

  todos.refetch();
  todoText.value = '';
  todoNumber.value = 999;
  buttonText.value = 'Submit';
}

async function handleDeleteTodoClick(todoID) {
  await deleteTodo.mutateAsync({
    id: todoID
  });
  todos.refetch();
}

function handleEditTodoCLick(todoID, updatedTodoString) {
  todoText.value = updatedTodoString;
  todoNumber.value = todoID;
  buttonText.value = 'Update';
}

const myTodos = computed(() => todos.data.value ?? []);
</script>

<template>
  <h1>TODOs</h1>

  <form @submit.prevent="handleSubmit">
    <input v-model="todoText" placeholder="Enter todo" required />
    <input v-model="todoNumber" v-show="false" />
    <button type="submit">{{ buttonText }}</button>
  </form>
  <br />
  <ul>
    <li v-for="todo in myTodos" :key="todo.id">
      {{ todo.text }}
      <button @click="handleDeleteTodoClick(todo.id)">Delete Todo</button>
      <button @click="handleEditTodoCLick(todo.id, todo.text)">
        Edit Todo
      </button>
    </li>
  </ul>
</template>

<style lang="postcss" scoped>
@import 'open-props/media';

section {
  width: 100%;
  max-width: var(--size-lg);
  margin-inline: auto;
}
</style>
