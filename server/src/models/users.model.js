const User = {
  insertUser: `
    INSERT INTO sys_user
    (full_name, e_mail, password, phone, address, user_type)
    VALUES (?,?,?,?,?,?)
  `,

  selectUserByEmail: `
    SELECT * FROM sys_user WHERE e_mail = (?)
  `,

  selectRandomManagerId: `
    SELECT user_id FROM sys_user 
    WHERE user_type = "system_manager"
    ORDER BY RAND() LIMIT 1
  `,
};

module.exports = User;
