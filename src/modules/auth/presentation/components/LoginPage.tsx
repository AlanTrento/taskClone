import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckSquareOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { styles } from './AuthPage.styles';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error, clearError, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <CheckSquareOutlined style={styles.icon} />
          <h1 style={styles.title}>Entrar</h1>
          <p style={styles.subtitle}>Acesse suas tarefas</p>
        </div>

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError(); }}
            style={styles.input}
            autoFocus
          />
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError(); }}
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
          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{
              ...styles.button,
              ...(loading || !email || !password ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.link}>
          <Link to="/register" style={{ color: '#8ab4f8', textDecoration: 'none' }}>
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
