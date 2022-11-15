const User = {
  insertUser: `
    INSERT INTO sys_user
    (full_name, e_mail, password, phone, address, user_type)
    VALUES (?,?,?,?,?,?)
  `,

  selectUserByEmail: `
    SELECT * FROM sys_user WHERE e_mail = (?)
  `,

  selectRandomManager: `
    SELECT user_id, e_mail FROM sys_user 
    WHERE user_type = "system_manager"
    ORDER BY RAND() LIMIT 1
  `,

  updateUserByEmail: `
    UPDATE sys_user 
    SET password = (?), phone = (?), address = (?) 
    WHERE e_mail = (?)
  `,

  DeleteUserById: `
    DELETE FROM sys_user 
    WHERE user_id = ?
  `,
}

module.exports = User
