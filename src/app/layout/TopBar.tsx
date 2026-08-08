import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquareOutlined, MenuOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useAuth } from '../../modules/auth/presentation/hooks/useAuth';
import { useIsMobile } from '../../shared/hooks/useMediaQuery';
import { styles } from './TopBar.styles';

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const initial = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <header style={styles.header}>
      <Space size={12} align="center">
        {isMobile && (
          <button
            type="button"
            onClick={onMenuClick}
            style={styles.hamburgerButton}
          >
            <MenuOutlined />
          </button>
        )}
        <CheckSquareOutlined style={styles.logoIcon} />
        <span style={styles.logoText}>
          Tarefas
        </span>
      </Space>

      <Space size={16} align="center">
        <div
          onClick={() => navigate('/profile')}
          onMouseEnter={() => setIsAvatarHovered(true)}
          onMouseLeave={() => setIsAvatarHovered(false)}
          style={{
            ...styles.avatar,
            ...(isAvatarHovered ? styles.avatarHover : {}),
            backgroundColor: user?.photo ? 'transparent' : '#8ab4f8',
          }}
        >
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Foto"
              style={styles.avatarImage}
            />
          ) : (
            <span style={styles.avatarInitial}>{initial}</span>
          )}
        </div>
      </Space>
    </header>
  );
}
