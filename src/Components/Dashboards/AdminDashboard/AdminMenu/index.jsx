import styled from 'styled-components';
import { ADMINMENULINKS } from '../../../../Constants/AdminDashboard';
import theme from '../../../../Theme/base';
import Divider from '../../../Shared/Divider';
import Spacer from '../../../Shared/Spacer';
import Logout from '../../../Shared/Icons/LogOut';
import UserIcon from '../../../Shared/Icons/User';

const AdminMenu = ({ handleClick, toggleState, handleLogout }) => {
  return (
    <AdminMenuContainer>
      {ADMINMENULINKS.map((elem, index) => {
        return (
          <>
            <LinksContainer>
              <Spacer height={10} />
              <Content>
                {elem.icon === 'user' ? <UserIcon /> : <Logout />}
                <MenuButton
                  onClick={(e) =>
                    elem.icon === 'user'
                      ? handleClick(index, elem.menuName, elem.url)
                      : handleLogout()
                  }
                >
                  {elem.menuName}
                </MenuButton>
              </Content>
              <Spacer height={10} />
            </LinksContainer>
            {index === 0 && <Divider />}
          </>
        );
      })}
    </AdminMenuContainer>
  );
};

const AdminMenuContainer = styled.div`
  position: absolute;
  top: 70px;
  margin-left: -150px;
  background-color: ${theme.color.white};
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  width: 200px;
  z-index: ${theme.zIndex.modals};
  padding: 20px 0;
`;

const LinksContainer = styled.div`
  cursor: pointer;
  padding: 0 20px;
  text-align: left;

  &:hover {
    background-color: ${theme.color.lightGrey};
  }
`;

const Content = styled.div`
  display: flex;
  gap: 5px;
`;

const MenuButton = styled.button`
  text-decoration: none;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: ${theme.fontFamily.primary};
  font-size: 14px;
  cursor: pointer;
  color: ${theme.color.darkGrey};

  &:hover {
    background-color: ${theme.color.lightGrey};
  }
`;

export default AdminMenu;
