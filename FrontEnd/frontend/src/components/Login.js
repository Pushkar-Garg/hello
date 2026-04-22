import { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await axios.post("http://localhost:1000/login", formData);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default Login