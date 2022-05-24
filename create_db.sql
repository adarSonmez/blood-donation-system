CREATE DATABASE IF NOT EXISTS blood_donation;
USE blood_donation;
CREATE TABLE IF NOT EXISTS sys_user (
  user_id INT NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(64) NOT NULL,
  e_mail VARCHAR(64) NOT NULL,
  password VARCHAR(16) NOT NULL,
  phone CHAR(10),
  address VARCHAR(255),
  user_type VARCHAR(32) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE e_mail (e_mail)
);
CREATE TABLE IF NOT EXISTS donor (
  donor_id CHAR(11) NOT NULL,
  name VARCHAR(64) NOT NULL,
  blood_type VARCHAR(3) NOT NULL,
  recep_id INT NOT NULL,
  FOREIGN KEY (recep_id) REFERENCES sys_user(user_id) ON DELETE CASCADE,
  PRIMARY KEY (donor_id)
);
CREATE TABLE IF NOT EXISTS orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  blood_type VARCHAR(3) NOT NULL,
  amount INT NOT NULL,
  state VARCHAR(16) DEFAULT "waiting",
  hospital_id INT NOT NULL,
  man_id INT NOT NULL,
  FOREIGN KEY(man_id) REFERENCES sys_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY(hospital_id) REFERENCES sys_user(user_id) ON DELETE CASCADE,
  PRIMARY KEY(order_id)
);
CREATE TABLE IF NOT EXISTS blood_bank (
  bank_id INT NOT NULL AUTO_INCREMENT,
  address VARCHAR(255) NOT NULL,
  capacity INT DEFAULT 0,
  man_id INT NOT NULL,
  FOREIGN KEY(man_id) REFERENCES sys_user(user_id) ON DELETE CASCADE,
  PRIMARY KEY(bank_id)
);
CREATE TABLE IF NOT EXISTS blood (
  blood_id INT NOT NULL AUTO_INCREMENT,
  donor_id CHAR(11) NOT NULL,
  bank_id INT NOT NULL,
  donated_date DATE DEFAULT CURRENT_DATE(),
  FOREIGN KEY(bank_id) REFERENCES blood_bank(bank_id) ON DELETE CASCADE,
  FOREIGN KEY(donor_id) REFERENCES donor(donor_id) ON DELETE CASCADE,
  PRIMARY KEY(blood_id)
);