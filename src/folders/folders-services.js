const FolderService = {
  getAllFolder(db) {
    return db('noteful_folders')
      .select('*');
  },

  insertFolder(db, data) {
    return db('noteful_folders')
      .insert(data)
      .returning('*')
      .then(rows => rows[0]);
  },

  getById(db, id) {
    return db('noteful_folders')
      .select('*')
      .where({ id })
      .first();
  },
      
  deleteById(db, id) {
    return db('noteful_folders')
      .where({ id })
      .delete();
  },
      
  updateById(db, id, data) {
    return db('noteful_folders')
      .where({ id })
      .update(data);
  }
};
      
module.exports = FolderService;