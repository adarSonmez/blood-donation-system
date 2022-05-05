function multipleColumnSet(object) {
  if (typeof object !== 'object') throw new Error('Invalid input');

  const keys = Object.keys(object);
  const values = Object.values(object);

  const columnSet = keys.map((key) => `${key} = ?`).join(', ');

  return {
    columnSet,
    values,
  };
}

function createInsertionQuery(tableName, object) {
  if (typeof object !== 'object') throw new Error('Invalid input');

  const keys = Object.keys(object);
  const values = Object.values(object);

  let query = `INSERT INTO ${tableName} (`;
  keys.forEach((k) => query.concat(k + ','));
  query.replace(/.$/, ') VALUES (');

  values.forEach((v) => query.concat(v + ','));
  query.replace(/.$/, ')');

  return query;
}

module.exports = {
  multipleColumnSet,
  createInsertionQuery,
};
