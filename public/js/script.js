// HTTP requests

async function getTaskList() {
  const response = await fetch('http://localhost:3000/tasks')
  return response.json()
}

async function getTask(id) {
  return await fetch(`http://localhost:3000/tasks/${id}`)
}

async function postTask(data) {
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      task: data,
      status: 'new'
    })
  })

  return response
}

async function deleteTask(id) {
  return await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'delete'
  })
}

async function putTask(id, data) {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'put',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response
}


// DOM

function addTask() {
  const task = document.querySelector('#task')
  postTask(task.value).then(response => {
    if (response.status === 201) {
        task.value = ''
        refreshLists()
    }
  })
}

function taskID(element) {
  return element.parentElement.parentElement.id
}

function removeTaskFromList(element) {
  deleteTask(taskID(element)).then(response => {
    if (response.status === 204) refreshLists()
  })
}

function updateTaskStatus(element) {
  const taskId = taskID(element)
  getTask(taskId)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then(data => {
      const newData = {
        task: data.task
      }
      if (data.status === 'new') {
        newData.status = 'doing'
      } else {
        newData.status = 'done'
      }

      putTask(data._id, newData).then(response => {
        if (response.status === 200) refreshLists()
      })
    })
}

function createElementControls(status) {
  const divControls = document.createElement('div')
  const removeBtn = document.createElement('button')
  const removeSpan = document.createElement('span')
  divControls.className = 'controls'
  removeBtn.className = 'remove-btn'
  removeBtn.addEventListener('click', e => removeTaskFromList(removeBtn))
  removeSpan.className = 'material-icons'
  removeSpan.textContent = 'delete'
  removeBtn.append(removeSpan)
  divControls.append(removeBtn)

  if (status !== 'done') {
    const forwardBtn = document.createElement('button')
    const forwardSpan = document.createElement('span')
    forwardBtn.className = 'forward-btn'
    forwardBtn.addEventListener('click', e => updateTaskStatus(forwardBtn))
    forwardSpan.className = 'material-icons'
    forwardSpan.textContent = 'arrow_forward'
    forwardBtn.append(forwardSpan)
    divControls.append(forwardBtn)
  }

  return divControls
}

function createElementTask({ task, _id, status }) {
  const divTask = document.createElement('div')
  const p = document.createElement('p')

  p.textContent = task
  divTask.className = 'task'
  divTask.id = _id
  divTask.append(p)
  divTask.append(createElementControls(status))
  return divTask
}

function refreshLists() {
  getTaskList().then(tasks => {
    const newTask = document.querySelector('.new-task .tasks')
    const doing = document.querySelector('.doing .tasks')
    const done = document.querySelector('.done .tasks')
    newTask.innerHTML = ''
    doing.innerHTML = ''
    done.innerHTML = ''

    tasks.new.forEach(task => {
      newTask.append(createElementTask(task))
    })
    tasks.doing.forEach(task => {
      doing.append(createElementTask(task))
    })
    tasks.done.forEach(task => {
      done.append(createElementTask(task))
    })
  })
}

const form = document.querySelector('#form')

window.addEventListener('load', refreshLists)

form.addEventListener('submit', e => {
  e.preventDefault()
  addTask()
})
