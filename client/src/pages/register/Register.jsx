import { useState } from 'react';
import { register } from '../../api/users.api';

function Register() {
  const [form, setForm] = useState({
    full_name: '',
    e_mail: '',
    password: '',
    phone: '',
    address: '',
    user_type: 'System manager',
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form)
      .then((res) => {
        if (res.data.success) alert('Successfully registered!');
        else alert('This e-mail is already registered!');
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="register-page">
      <form className="register-user-form" onSubmit={handleSubmit}>
        <label htmlFor="full_name">Full Name: </label>
        <input
          type="text"
          maxLength={64}
          name="full_name"
          placeholder="Enter full name for new user"
          value={form.full_name}
          onChange={handleChange}
          required
          id="full_name"
        />

        <label htmlFor="e_mail">E-mail: </label>
        <input
          type="email"
          name="e_mail"
          placeholder="Enter e-mail for new user"
          value={form.e_mail}
          onChange={handleChange}
          required
          id="e_mail"
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Enter temporary password for new user"
          value={form.password}
          onChange={handleChange}
          minLength={6}
          required
          id="password"
        />

        <label htmlFor="phone">Phone: </label>
        <input
          type="tel"
          maxLength={10}
          name="phone"
          placeholder="Enter phone number for new user"
          value={form.phone}
          onChange={handleChange}
          required
          id="phone"
        />

        <label htmlFor="address">Address: </label>
        <textarea
          name="address"
          rows={3}
          placeholder="Enter address for new user"
          value={form.address}
          onChange={handleChange}
          required
          id="address"
        />

        <label htmlFor="user_type">User Type: </label>
        <select
          name="user_type"
          value={form.user_type}
          onChange={handleChange}
          id="user_type"
          required
        >
          <option key={0} value={'system_manager'}>
            System Manager
          </option>
          <option key={1} value={'receptionist'}>
            Receptionist
          </option>
          <option key={2} value={'hospital'}>
            Hospital
          </option>
        </select>

        <button type="submit">Register User</button>
      </form>
    </main>
  );
}

export default Register;
