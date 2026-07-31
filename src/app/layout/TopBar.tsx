import { MenuOutlined, QuestionCircleOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

export function TopBar() {
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
      <Space size={16} align="center">
        <MenuOutlined style={{ fontSize: 24, color: '#e8eaed', cursor: 'pointer' }} />
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: '#8ab4f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#202124',
          fontWeight: 'bold',
          fontSize: 14,
        }}>
          T
        </div>
        <span style={{ color: '#e8eaed', fontSize: 22, fontWeight: 400 }}>
          Tarefas
        </span>
      </Space>

      <Space size={16} align="center">
        <QuestionCircleOutlined style={{ fontSize: 20, color: '#9aa0a6', cursor: 'pointer' }} />
        <AppstoreOutlined style={{ fontSize: 20, color: '#9aa0a6', cursor: 'pointer' }} />
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#5f6368', cursor: 'pointer' }} />
      </Space>
    </header>
  );
}
