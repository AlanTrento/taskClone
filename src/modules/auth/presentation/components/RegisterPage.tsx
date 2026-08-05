import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckSquareOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { styles } from './AuthPage.styles';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordValid = PASSWORD_REGEX.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Todos os campos são obrigatórios');
      return;
    }

    if (!passwordValid) {
      setLocalError('A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial (@$!%*?&#)');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('As senhas não conferem');
      return;
    }

    await register(name, email, password);
  };

  const displayError = localError || error;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <CheckSquareOutlined style={styles.icon} />
          <h1 style={styles.title}>Criar conta</h1>
          <p style={styles.subtitle}>Comece a organizar suas tarefas</p>
        </div>

        {displayError && (
          <div style={styles.error}>{displayError}</div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => { setName(e.target.value); setLocalError(''); clearError(); }}
            style={styles.input}
            autoFocus
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setLocalError(''); clearError(); }}
            style={styles.input}
          />
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setLocalError(''); clearError(); }}
              style={styles.passwordInput}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </div>
          {password.length > 0 && (
            <div style={styles.passwordHint}>
              {passwordValid ? '✓ Senha válida' : '8+ chars, maiúscula, minúscula, número e especial (@$!%*?&#)'}
            </div>
          )}
          <div style={styles.passwordWrapper}>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setLocalError(''); clearError(); }}
              style={{
                ...styles.passwordInput,
                borderColor: confirmPassword ? (passwordsMatch ? '#81c995' : '#ff4d4f') : undefined,
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={styles.eyeButton}
            >
              {showConfirm ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </div>
          {confirmPassword.length > 0 && (
            <div style={styles.passwordHint}>
              {passwordsMatch ? '✓ Senhas conferem' : '✗ Senhas não conferem'}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !name || !email || !passwordValid || !passwordsMatch}
            style={{
              ...styles.button,
              ...(loading || !name || !email || !passwordValid || !passwordsMatch ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <div style={styles.link}>
          <Link to="/login" style={{ color: '#8ab4f8', textDecoration: 'none' }}>
            Já tenho conta
          </Link>
        </div>
      </div>
    </div>
  );
}
