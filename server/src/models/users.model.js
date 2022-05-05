const User = {
  insertUser: `
    INSERT INTO sys_user
    (full_name, e_mail, password, phone, address, user_type)
    VALUES (?,?,?,?,?,?)
  `,

  selectUserByEmail: `
    SELECT full_name, e_mail, password, user_type
    FROM sys_user WHERE e_mail = '?'
  `,
};

module.exports = User;
