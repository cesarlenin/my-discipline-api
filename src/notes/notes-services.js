const NotesService = {
  getAllNotes(db) {
    return db('noteful_notes')
      .select('*');
  },
    
  insertNote(db, data) {
    return db('noteful_notes')
      .insert(data)
      .returning('*')
      .then(rows => rows[0]);
  },
    
  getById(db, id) {
    return db('noteful_notes')
      .select('*')
      .where({ id })
      .first();
  },
    
  deleteById(db, id) {
    return db('noteful_notes')
      .where({ id })
      .delete();
  },
    
  updateById(db, id, data) {
    return db('noteful_notes')
      .where({ id })
      .update(data);
  }
};
    
module.exports = NotesService;