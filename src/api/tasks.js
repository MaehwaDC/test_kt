import Entity from './BaseEntity';

export class TasksApi extends Entity {
  async getTasks(pageNumber) {
    const res = await this.firebase.database().ref('/tasks').once('value');
    console.log('res.val(', res.val())
    return res.val();
  }
  
  async updateTask(task, count, id) {
    const updates = {};
    let currentId = id;
    if (!currentId) {
      currentId = this.firebase.database().ref().child('tasks').push().key;
    } 
    updates['/tasks/' + count] = { id: currentId, ...task };
    const res = await this.firebase.database().ref().update(updates, this.errorHandler);
    return res;
  }

  async deleteTask(id) {
    const res = await this.firebase.database().ref('/tasks/' + id).remove(this.errorHandler);
    return res;
  }

  async updateTasksHendler(page, limit, func) {
    let ref = this.firebase.database().ref('/tasks');
    // ref = ref.startAt((page * limit) - limit);
    ref = ref.limitToLast(page * limit);
    ref.on('value', func);
  }

  errorHandler(err) {
    if (err) {
      return err;
    }
    return null;
  }
}
