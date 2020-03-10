import Entity from './BaseEntity';

export class TasksApi extends Entity {
  async updateTask(task, id) {

    const col = this.firebase.firestore().collection("tasks");

    let doc;
    // create new task
    if (!id) {
      const docMeta = this.firebase.firestore().collection("meta").doc('tasksData');

      const { totalCount } = (await docMeta.get()).data();
      docMeta.update({ totalCount: totalCount + 1 });

      doc = col.doc();

      return await doc.set({ index: totalCount, id: doc.id, date: Date.now(), ...task });
    }
    doc = col.doc(id);
    const res = await doc.update(task);
    return res;
  }

  async deleteTask(id) {
    const docMeta = this.firebase.firestore().collection("meta").doc('tasksData');

    const { totalCount } = (await docMeta.get()).data();
    docMeta.update({ totalCount: totalCount - 1 });


    return await this.firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .delete();
  }

  async updateTasksHandler(page, limit, dispatch) {
    let colTasks = this.firebase.firestore().collection("tasks");

    const docMeta = this.firebase.firestore().collection("meta").doc('tasksData');

    const { totalCount } = (await docMeta.get()).data();

    let startLimit = totalCount - ((page - 1) * limit);
    colTasks = colTasks.orderBy('index', 'desc');
    if (page === 1) {
      colTasks = colTasks.startAt(totalCount);
    } else {
      colTasks = colTasks.startAfter(startLimit);
    }


    colTasks = colTasks.limit(limit)

    const colMetaUnsub = docMeta.onSnapshot((res) => {
      dispatch(res.data());
    });

    const colTasksUnsub = colTasks.onSnapshot((res) => {
      const data = res.docs.map(doc => doc.data());
      dispatch({
        data,
      });
    });

    return () => {
      colTasksUnsub();
      colMetaUnsub();
    }
  }

  async fetchTask(id) {
    let colTasks = this.firebase.firestore().collection("tasks");

    const snapshot = await colTasks.doc(id).get();

    return snapshot.data();
  }

  errorHandler(err) {
    if (err) {
      return err;
    }
    return null;
  }
}
