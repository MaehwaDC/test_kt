import Entity from './BaseEntity';

export class TasksApi extends Entity {
  async getTasks(pageNumber, limit) {
    let ref = this.firebase.database().ref('/tasks');
    ref = ref.orderByChild('count');
    ref = ref.startAt(((pageNumber * limit) - limit).toString());
    ref = ref.endAt((pageNumber * limit).toString());
    const res = await ref.once('value');
    return res.val();
  }
  
  async updateTask(task, id) {
    const updates = {};

    const ref = this.firebase.database().ref('/tasks');
    if (!id) {
      ref.push({ ...task });
      return;
    } 
    updates['/' + id] = task;
    const res = await ref.update(updates, this.errorHandler);
    return res;
  }

  async deleteTask(id) {
    const res = await this.firebase.database().ref('/tasks/' + id).remove(this.errorHandler);
    return res;
  }

  removeHandlers = () => {
    this.firebase.database().ref('/tasks').off();
  }

  async updateTasksHendler(page, limit, func) {
    let ref = this.firebase.database().ref('/tasks');
    ref = ref.orderByChild('count');
    ref = ref.startAt(((page * limit) - limit).toString());
    ref = ref.endAt((page * limit).toString());
    ref.on('value', func);
  }

  errorHandler(err) {
    if (err) {
      return err;
    }
    return null;
  }
}
