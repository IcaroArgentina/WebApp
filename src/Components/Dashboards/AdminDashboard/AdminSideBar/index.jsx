
import styled from 'styled-components';
import { SIDEMENUCATEGORIES } from '../../../../Constants/AdminDashboard';

const AdminSidebar = ({ handleClick, toggleState, selectedTab }) => {
  return (
    <SidebarContainer>
      {SIDEMENUCATEGORIES.map((elem, index) => (
        <StyledLink
          onClick={(e) => handleClick(index, elem.menuName, elem.url)}
          key={index}
          isActive={elem.menuName === selectedTab}
        >
          {elem.menuName}
        </StyledLink>
      ))}
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  float: left;
  min-height: 80vh !important;
  width: 20%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;

const StyledLink = styled.button`
  display: block;
  text-decoration: none;
  background-color: inherit;
  color: black;
  padding: 22px 16px;
  border: none;
  width: 100%;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
  ${({ isActive }) => isActive && 'background: #f2f2f2;'}

  &:hover {
    background: #f2f2f2;
  }

  &.active {
    background: #f2f2f2;
  }
`;

export default AdminSidebar;
