import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { decode, getRandomManager, login } from '../../api/users.api';
import { UserContext } from '../../contexts/user.context';
import './Login.css';

function Login() {
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [randomManMail, setRandomManMail] = useState('adarsonmez@outlook.com');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    getRandomManager()
      .then((m) => setRandomManMail(m.data.e_mail))
      .catch((e) => console.error(e));
  }, []);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    login(form)
      .then((r) => {
        if (!r.data.success) alert(r.data.message);
        else {
          localStorage.setItem('x-access-token', r.data.token);
          decode({ token: localStorage.getItem('x-access-token') })
            .then((r) => {
              if (r.data.user) {
                const { id, name, email, type } = r.data.user;
                setCurrentUser({ id, name, email, type });
              }
            })
            .catch((err) => console.error(err.message));
          navigate('/');
        }
      })
      .catch((e) => console.error(e.message));
    e.preventDefault();
  };

  return (
    <main className="login-page">
      <p className="contact-message">
        If you are unable to login as a receptionist, hospital or system
        administrator, <br />
        please <a href={`mailto:${randomManMail}`}>contact us</a>.
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
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            placeholder="password"
            onChange={handleChange}
            required
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
