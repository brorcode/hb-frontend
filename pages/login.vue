<template>
  <form class="mx-auto mt-16 max-w-xl sm:mt-20" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="company" class="block text-sm font-semibold leading-6 text-gray-900"
          >Email</label
        >
        <div class="mt-2.5">
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label for="email" class="block text-sm font-semibold leading-6 text-gray-900"
          >Password</label
        >
        <div class="mt-2.5">
          <input
            id="password"
            v-model="form.password"
            type="password"
            name="password"
            autocomplete="password"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
    <div class="mt-10">
      <button
        type="submit"
        class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Login
      </button>
    </div>
  </form>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
});

const form = reactive({
  email: '',
  password: ''
});

const response = ref(null);

const handleSubmit = async () => {
  response.value = await $fetch('http://localhost:8081/api/v1/login', {
    method: 'POST',
    body: form
  })
    .then((res) => res.json())
    .catch((err) => err);

  console.log('response', response.value);

  // const response = await $fetch('http://localhost:8081/api/v1/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: form
  // });

  // error.value = err.value;

  console.log('response', response);
};

// const handleSubmit = async () => {
//   try {
//     const response = await fetch('http://localhost:8081/api/v1/login', {
//       method: 'POST',
//       body: JSON.stringify(form), // Ensure the body is stringified if it's not already
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error status: ${response.status}`);
//     }
//
//     const todo = await response.json();
//     console.log('todo', todo);
//   } catch (err) {
//     console.error('Error:', err.message);
//   }
// };
</script>
