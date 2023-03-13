const getQuestions = async () => {
  try {
    const res = await fetch('http://localhost:5000/questions')
    if (res.ok) {
      const questions = await res.json()
      return questions
    } else {
      throw new Error('There is something wrong, cannot get your data!')
    }
  } catch (error) {
    console.log(error)
  }
}

export { getQuestions }
