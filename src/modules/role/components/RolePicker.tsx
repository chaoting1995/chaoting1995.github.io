import React from 'react'
import { css, cx } from '@emotion/css';
import { Gavel, ChatsCircle } from '@phosphor-icons/react';

import { EnumRoleWithNull } from 'modules/role';
import { RoleCard } from 'modules/role';
import { SideDrawer, ResultPicker } from 'modules/role';
import { EnumRole } from "modules/role/enums/enumRole";

const roleWording: Record<EnumRole, string> = {
  [EnumRole.Judge]: '裁判',
  [EnumRole.Player]: '選手'
};

type Props = {
  className?: string;
};

const RolePicker = (props: Props) => {
  const [role, setRole] = React.useState<EnumRoleWithNull>(null);
  
  const roleCreator: Record<EnumRole, React.ReactNode> = {
    [EnumRole.Judge]: <ResultPicker />,
    [EnumRole.Player]: <SideDrawer />
  };

  const handleChangeRole = (_role: EnumRole) => () => {
    setRole(_role)
  };

  if (role) {
    return roleCreator[role];
  }
  
  return (
    <div className={cx('DT-RolePicker', props.className, style)}>
      <div className='picker-title'>角色</div>
      <div className='picker-group'>
        <RoleCard
          className='role-picker-role-card'
          roleText={roleWording[EnumRole.Judge]}
          onClick={handleChangeRole(EnumRole.Judge)}
        >
          <Gavel size={40} weight="light"/>
        </RoleCard>
        <RoleCard
          className='role-picker-role-card'
          roleText={roleWording[EnumRole.Player]}
          onClick={handleChangeRole(EnumRole.Player)}
        >
          <ChatsCircle size={40} weight="light"/>
        </RoleCard>
      </div>
    </div>
  )
}

export default RolePicker;

const style = css`
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition: 1s;
  
  .picker-title {
    font-size: 20px;
    font-weight: bold;
  }

  .picker-group {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 16px;
    
    .role-picker-role-card {
      padding: 20px;
    }
  }
`