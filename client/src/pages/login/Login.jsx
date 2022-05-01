import { useState } from 'react';
import './Login.css';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Handles change for any input field
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <main className="login-page">
      <p className="contact-message">
        If you are unable to login as a receptionist, hospital or system
        administrator, <br />
        please <a href="mailto:adarsonmez@gmail.com">contact us</a>.
      </p>
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit} method="POST">
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            placeholder="username"
            onChange={handleChange}
          />
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            placeholder="password"
            onChange={handleChange}
          />
          <button type="submit" className="submitBtn">
            login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
