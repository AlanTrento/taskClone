import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { styles } from './AuthPage.styles';

const profileStyles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#202124',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '32px 16px',
  },
  header: {
    width: '100%',
    maxWidth: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#8ab4f8',
    fontSize: 20,
    cursor: 'pointer',
    padding: 8,
  },
  headerTitle: {
    color: '#e8eaed',
    fontSize: 22,
    fontWeight: 500,
    margin: 0,
  },
  card: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#2b2c2f',
    borderRadius: 12,
    padding: '32px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    backgroundColor: '#8ab4f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#171717',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  uploadButton: {
    backgroundColor: '#35363a',
    color: '#8ab4f8',
    border: '1px solid #3c4043',
    borderRadius: 8,
    padding: '8px 16px',
    fontSize: 13,
    cursor: 'pointer',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    color: '#9aa0a6',
    fontSize: 13,
    marginBottom: 8,
    display: 'block' as const,
  },
  input: {
    backgroundColor: '#35363a',
    border: '1px solid #3c4043',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#e8eaed',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  dateInput: {
    backgroundColor: '#35363a',
    border: '1px solid #3c4043',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#e8eaed',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    colorScheme: 'dark',
  },
  button: {
    backgroundColor: '#8ab4f8',
    color: '#171717',
    border: 'none',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#35363a',
    color: '#8ab4f8',
    border: '1px solid #3c4043',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 14,
    cursor: 'pointer',
    width: '100%',
  },
  dangerButton: {
    backgroundColor: 'transparent',
    color: '#ff4d4f',
    border: '1px solid #ff4d4f',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 14,
    cursor: 'pointer',
    width: '100%',
    marginTop: 16,
  },
  success: {
    backgroundColor: 'rgba(129,201,149,0.1)',
    border: '1px solid #81c995',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#81c995',
    fontSize: 13,
    marginBottom: 16,
  },
  modal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#2b2c2f',
    borderRadius: 12,
    padding: '32px',
    width: 400,
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
  },
  modalTitle: {
    color: '#e8eaed',
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 24,
  },
  modalActions: {
    display: 'flex',
    gap: 12,
    marginTop: 24,
  },
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile, changePassword, logout, loading, error, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.birthdate) {
        setBirthdate(user.birthdate.toISOString().split('T')[0]);
      }
    }
  }, [user]);

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    await updateProfile({
      name,
      birthdate: birthdate ? new Date(birthdate) : undefined,
    });
    setSuccessMessage('Perfil atualizado com sucesso');
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (newPassword !== confirmNewPassword) {
      return;
    }

    await changePassword(currentPassword, newPassword);
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setSuccessMessage('Senha alterada com sucesso');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      updateProfile({ photo: base64 });
    };
    reader.readAsDataURL(file);
  };

  if (!user) return null;

  const initial = user.name?.charAt(0).toUpperCase() || '?';

  return (
    <div style={profileStyles.page}>
      <div style={profileStyles.header}>
        <button style={profileStyles.backButton} onClick={() => navigate('/')}>
          <ArrowLeftOutlined />
        </button>
        <h1 style={profileStyles.headerTitle}>Meu Perfil</h1>
      </div>

      <div style={profileStyles.card}>
        {successMessage && (
          <div style={profileStyles.success}>{successMessage}</div>
        )}
        {error && (
          <div style={styles.error}>{error}</div>
        )}

        <div style={profileStyles.avatarSection}>
          <div style={profileStyles.avatar}>
            {user.photo ? (
              <img src={user.photo} alt="Foto" style={profileStyles.avatarImage} />
            ) : (
              initial
            )}
          </div>
          <label style={profileStyles.uploadButton}>
            Trocar foto
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <form onSubmit={handleSaveProfile}>
          <div style={profileStyles.section}>
            <label style={profileStyles.label}>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={profileStyles.input}
            />
          </div>

          <div style={profileStyles.section}>
            <label style={profileStyles.label}>Email</label>
            <input
              type="email"
              value={email}
              disabled
              style={{ ...profileStyles.input, opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>

          <div style={profileStyles.section}>
            <label style={profileStyles.label}>Data de nascimento</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              style={profileStyles.dateInput}
            />
          </div>

          <button type="submit" disabled={loading} style={profileStyles.button}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setShowPasswordModal(true)}
          style={{ ...profileStyles.secondaryButton, marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <LockOutlined /> Trocar senha
        </button>

        <button type="button" onClick={handleLogout} style={profileStyles.dangerButton}>
          Sair da conta
        </button>
      </div>

      {showPasswordModal && (
        <div style={profileStyles.modal} onClick={() => setShowPasswordModal(false)}>
          <div style={profileStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={profileStyles.modalTitle}>Trocar senha</h2>
            <form onSubmit={handleChangePassword}>
              <div style={profileStyles.section}>
                <label style={profileStyles.label}>Senha atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={profileStyles.input}
                  autoFocus
                />
              </div>
              <div style={profileStyles.section}>
                <label style={profileStyles.label}>Nova senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={profileStyles.input}
                />
              </div>
              <div style={profileStyles.section}>
                <label style={profileStyles.label}>Confirmar nova senha</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  style={profileStyles.input}
                />
              </div>
              <div style={profileStyles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  style={{ ...profileStyles.secondaryButton, flex: 1 }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!currentPassword || !newPassword || newPassword !== confirmNewPassword}
                  style={{
                    ...profileStyles.button,
                    flex: 1,
                    opacity: (!currentPassword || !newPassword || newPassword !== confirmNewPassword) ? 0.6 : 1,
                  }}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
