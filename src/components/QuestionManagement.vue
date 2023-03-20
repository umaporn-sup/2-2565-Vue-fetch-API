<script setup>
import { getQuestions } from '../composable/getQuestions.js'
import { ref, onMounted } from 'vue'
import DeleteIcon from './icons/DeleteIcon.vue'
const questions = ref([])

const deleteQuestion = async (deleteId) => {
  try {
    const res = await fetch(`http://localhost:5000/questions/${deleteId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      questions.value = questions.value.filter((quest) => {
        return quest.id !== deleteId
      })
    } else throw new error('Error, cannot delete data!')
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  questions.value = await getQuestions()
  console.log(questions.value)
})
</script>
<template>
  <div class="w-full max-w-5xl border border-gray-200 p-2">
    <div v-for="quest in questions" :key="quest.id">
      <div class="flex items-center">
        <DeleteIcon class="text-red-500" @click="deleteQuestion(quest.id)" />
        <h1 class="font-semibold">{{ quest.id }}. {{ quest.text }}</h1>
      </div>
      <ul class="pl-6">
        <li v-for="option in quest.options" :key="option.id">
          <p>{{ option.label }}. {{ option.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
