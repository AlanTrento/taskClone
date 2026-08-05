import { useNavigate } from 'react-router-dom';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useAuth } from '../../modules/auth/presentation/hooks/useAuth';

export function TopBar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const initial = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <header style={{
      height: 64,
      backgroundColor: '#202124',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      borderBottom: '1px solid #3c4043',
    }}>
      <Space size={12} align="center">
        <CheckSquareOutlined style={{ fontSize: 28, color: '#8ab4f8' }} />
        <span style={{ color: '#e8eaed', fontSize: 22, fontWeight: 500 }}>
          Tarefas
        </span>
      </Space>

      <Space size={16} align="center">
        <div
          onClick={() => navigate('/profile')}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: user?.photo ? 'transparent' : '#8ab4f8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#171717',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Foto"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            initial
          )}
        </div>
      </Space>
    </header>
  );
}
