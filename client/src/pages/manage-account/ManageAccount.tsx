import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import {
  deleteUserById,
  getUserByEmail,
  updateUser,
} from '../../api/users.api';
import { UserContext } from '../../contexts/user.context';

function ManageAccount() {
  const { user, clearCurrentUser } = useContext(UserContext);

  const [checked, setChecked] = useState({
    password: false,
    phone: false,
    address: false,
  });

  const [updateForm, setUpdateForm] = useState({
    password: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    getUserByEmail(user.e_mail)
      .then((u) =>
        setUpdateForm({
          password: u.data.password,
          phone: u.data.phone,
          address: u.data.address,
        })
      )
      .catch((err) => console.error(err.message));
  }, [user]);

  const handleTextChange = (event: ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    let { name, value } = element;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const handleCheckedChange = (event: ChangeEvent) => {
    let name = event.target.id as keyof typeof checked;

    setChecked({
      ...checked,
      [name]: !checked[name],
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser({ ...updateForm, e_mail: user.e_mail })
      .then(() => alert('User information has been successfully changed!'))
      .catch((err) => console.error(err.message));
  };

  const deleteAccount = (e: FormEvent) => {
    const deleted = window.confirm(
      'Are you sure you want to delete your account?'
    );

    if (deleted)
      deleteUserById(user.user_id)
        .then(() => clearCurrentUser())
        .catch((e) => console.error(e));
  };

  return (
    <main className="manage-account-page">
      <form className="manage-account-form" onSubmit={handleSubmit}>
        <input
          type="checkbox"
          id="password"
          checked={checked.password}
          onChange={handleCheckedChange}
        />
        <label htmlFor="password">Update Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter temporary password for new user"
          value={updateForm.password}
          onChange={handleTextChange}
          required
          minLength={6}
          disabled={!checked.password}
        />

        <input
          type="checkbox"
          id="phone"
          checked={checked.phone}
          onChange={handleCheckedChange}
        />
        <label htmlFor="phone">Update Phone Number </label>
        <input
          type="tel"
          maxLength={10}
          name="phone"
          placeholder="Enter phone number for new user"
          value={updateForm.phone}
          onChange={handleTextChange}
          required
          disabled={!checked.phone}
        />

        <input
          type="checkbox"
          id="address"
          checked={checked.address}
          onChange={handleCheckedChange}
        />
        <label htmlFor="address">Update Address </label>
        <textarea
          name="address"
          rows={3}
          placeholder="Enter address for new user"
          value={updateForm.address}
          onChange={handleTextChange}
          required
          id="address"
          disabled={!checked.address}
        />
        <button type="submit">Update User</button>
      </form>
      <p className="delete-account" onClick={deleteAccount}>
        Delete Account
      </p>
    </main>
  );
}

export default ManageAccount;
