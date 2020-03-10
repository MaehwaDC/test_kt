import Entity from './BaseEntity';

export class TasksApi extends Entity {
  async updateTask(task, id) {

    const col = this.firebase.firestore().collection("tasks");

    let doc;
    // create new task
    if (!id) {
      const colData = await col.get();
      const size = colData.size;
      doc = col.doc();
      return await doc.set({ index: size, id: doc.id, date: Date.now(), ...task });
    }
    doc = col.doc(id);
    const res = await doc.update(task, this.errorHandler);
    return res;
  }

  async deleteTask(id) {
    const res = await this.firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .delete();
    return res;
  }

  async updateTasksHandler(page, limit, dispatch) {
    let col = this.firebase.firestore().collection("tasks");

    const firstLimit = Math.max((page * limit) - limit, limit);

    col = col.orderBy('index');
    col = col.startAt(firstLimit);
    col = col.limit(limit);

    return col.onSnapshot((res) => {
      const data = res.docs.map(doc => doc.data());
      dispatch({
        data,
        size: res.size,
      });
    })
  }

  errorHandler(err) {
    if (err) {
      return err;
    }
    return null;
  }
}
