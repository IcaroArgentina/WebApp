import { FaRegUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import { RiDashboardLine } from 'react-icons/ri';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import React from 'react';
import styled from 'styled-components';
import theme from '../../Theme/base';
import { useIsMobile } from '../../Hooks/Client';

const UserDisplay = ({
  userName,
  onClick,
  userRol,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const mobile = useIsMobile();

  const handleClick = () => {
    onClick();
  };

  const handleToggle = (open) => {
    open ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  const refUser = useLocation().pathname === '/user';
  const refProfile = useLocation().pathname === '/user/profile';
  const refAdmin = useLocation().pathname === '/admin';
  const refAdminProfile = useLocation().pathname === '/admin/perfil';

  return (
    <Container>
      <UserName mobile={mobile}>¡Hola {userName}!</UserName>

      <MdOutlineKeyboardArrowDown
        color="white"
        cursor="pointer"
        style={mobile && { margin: '0 20px 0 50px ' }}
        size={mobile ? 35 : 25}
        onClick={() => handleToggle(isMenuOpen)}
      />
      {isMenuOpen && (
        <UserMenu mobile={mobile}>
          {mobile && <UserName mobile={mobile}>¡Hola {userName}!</UserName>}
          <Item
            style={{
              cursor: (refUser || refAdmin) && 'auto',
              backgroundColor: (refUser || refAdmin) && theme.color.aqua,
            }}
          >
            <RiDashboardLine size={20} color={theme.color.login} />

            <LinkText mobile={mobile}>
              <Link
                style={{
                  cursor: (refUser || refAdmin) && 'auto',
                }}
                to={userRol === 'administrador' ? '/admin' : '/user'}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </LinkText>
          </Item>
          <Item
            style={{
              cursor: (refProfile || refAdminProfile) && 'auto',
              backgroundColor:
                (refProfile || refAdminProfile) && theme.color.aqua,
            }}
          >
            <FaRegUser size={20} color={theme.color.login} />

            <LinkText mobile={mobile}>
              <Link
                style={{
                  cursor: (refProfile || refAdminProfile) && 'auto',
                }}
                to={
                  userRol === 'administrador'
                    ? '/admin/perfil'
                    : '/user/profile'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Mi perfil
              </Link>
            </LinkText>
          </Item>
          <Item>
            <FaSignOutAlt size={20} color={theme.color.login} />
            <SignOutButton mobile={mobile} onClick={handleClick}>
              Cerrar sesión
            </SignOutButton>
          </Item>
        </UserMenu>
      )}
    </Container>
  );
};

export default UserDisplay;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 200px;
`;
const UserName = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1275rem;
  color: ${({ mobile }) => (mobile ? `${theme.color.darkBlue}` : 'white')};
  margin-right: 1.5rem;
`;
const SignOutButton = styled.button`
  border: unset;
  outline: none;
  background-color: transparent;
  font-family: ${theme.fontFamily.primary};
  font-size: ${({ mobile }) => (mobile ? `1rem` : '1.25rem')};
  line-height: 1.5rem;
  font-weight: 400;
  color: ${theme.color.login};
  padding: 0;
  margin-left: 1rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
const UserMenu = styled.div`
  position: absolute;
  background-color: white;
  top: ${({ mobile }) => (mobile ? '164%' : '1.8rem')};
  left: ${({ mobile }) => (mobile ? '-165%' : '-1.5rem')};
  width: ${({ mobile }) => (mobile ? '15.5rem' : '110%')};
  height: fit-content;
  padding: 1rem 0px;
  box-shadow: ${theme.shadow.boxShadow};
  display: flex;
  flex-direction: column;
`;
const Item = styled.span`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const LinkText = styled.span`
  font-size: ${({ mobile }) => (mobile ? '1rem' : '1.25rem')};
  line-height: 1.5rem;
  font-weight: 400;
  margin-left: 1rem;
  a {
    text-decoration: none;
    color: ${theme.color.login};
  }
  a:hover {
    text-decoration: underline;
  }
`;
