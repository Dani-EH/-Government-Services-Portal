const apiCandidates = {
  login: ['/api/auth/login', '/auth/login'],
  register: ['/api/auth/register', '/auth/register']
};

function showAlert(message, type = 'error') {
  const alert = document.getElementById('formAlert');
  if (!alert) return;
  alert.hidden = false;
  alert.className = `form-alert ${type}`;
  alert.textContent = message;
}

function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function postToFirstWorkingEndpoint(type, payload) {
  let lastError = 'Request failed. Please check your server route.';

  for (const endpoint of apiCandidates[type]) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) return { data, endpoint };
      lastError = data.message || data.error || lastError;
    } catch (err) {
      lastError = err.message || lastError;
    }
  }

  throw new Error(lastError);
}

document.querySelectorAll('[data-toggle-password]').forEach((button) => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.togglePassword);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    button.textContent = input.type === 'password' ? 'Show' : 'Hide';
  });
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = loginForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Logging in...';

    try {
      const payload = getFormData(loginForm);
      const { data } = await postToFirstWorkingEndpoint('login', payload);
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      showAlert('Login successful. Redirecting...', 'success');
      setTimeout(() => {
        const role = data.user.role;
        if (role === 'admin') window.location.href = '/admin';
        else if (role === 'employee') window.location.href = '/employee';
        else window.location.href = '/client';
      }, 1000);
    } catch (err) {
      showAlert(err.message);
    } finally {
      submit.disabled = false;
      submit.textContent = 'Login';
    }
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = registerForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Creating account...';

    try {
      const payload = getFormData(registerForm);
      await postToFirstWorkingEndpoint('register', payload);
      showAlert('Account created successfully. You can now login.', 'success');
      registerForm.reset();
    } catch (err) {
      showAlert(err.message);
    } finally {
      submit.disabled = false;
      submit.textContent = 'Create account';
    }
  });
}
