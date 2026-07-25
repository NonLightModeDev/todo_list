import repository from '../repository/Task.js'

class Index {
  list(req, res, next) {
    repository.list().then(result => {
      console.log(result)
      const newTasks = result.filter(task => task.status == 'new')
      const doingTasks = result.filter(task => task.status == 'doing')
      const doneTasks = result.filter(task => task.status == 'done')
      res.render('index', {
        tasks: {
          new: newTasks,
          doing: doingTasks,
          done: doneTasks
        }
      })
    })
  }
}

export default new Index()
