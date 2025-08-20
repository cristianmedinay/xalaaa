/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import avatarPlaceholder from "../../../resources/avatar-placeholder.png";

import "./User.scss";

export interface UserProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  className?: string;
}

const User: React.FC<UserProps> = ({ name, email, avatarUrl, className }) => {
  const avatar = avatarUrl ? avatarUrl : avatarPlaceholder;
  return (
    <div className={`user ${className}`}>
      <div className="circular">
        <img className="Avatar" alt="image" src={avatar} />
      </div>
      <div className="user__info">
        <div className="user__info__name">{name}</div>
        {email ? <div className="user__info__email">{email}</div> : null}
      </div>
    </div>
  );
};

export default User;
