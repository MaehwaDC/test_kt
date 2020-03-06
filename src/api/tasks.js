import Entity from './BaseEntity';

export class TasksApi extends Entity {
  async getTasks(pageNumber, limit) {
    const firstLimit = Math.max((pageNumber * limit) - limit, limit);
    let ref = this.firebase.firestore().collection("tasks");
    ref = ref.orderBy('index');
    ref = ref.startAt(firstLimit);
    ref = ref.limit(limit);
    const res = await ref.get();

    const data = res.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    console.log('data', data)
    return data;
  }
  
  async updateTask(task, id) {
    const updates = {};

    const ref = this.firebase.firestore().collection("tasks");
    let doc;
    if (!id) {
      doc = ref.doc();
      return await doc.set({ index: ref.size, id: doc.id, date: Date.now(), ...task });
      
    }
    doc = ref.doc(id);
    const res = await doc.update(updates, this.errorHandler);
    return res;
  }

  async deleteTask(id) {
    const res = await this.firebase.firestore().collection("tasks").doc(id).delete();
    return res;
  }

  removeHandlers = () => {
    this.firebase.database().ref('/tasks').off();
  }

  async updateTasksHandler(page, limit, func) {
    let ref = await this.firebase.firestore().collection("tasks").get();
    const data = ref.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    console.log('ref', data)
    const firstLimit = Math.max((page * limit) - limit, limit);
    const lastLimit = Math.max(page * limit, limit);
    ref.on('value', func);
  }

  errorHandler(err) {
    if (err) {
      return err;
    }
    return null;
  }
}
