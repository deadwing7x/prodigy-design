import React from 'react';
import { IUser } from './model/IUser';

const UserContext = React.createContext<IUser[]>([]);

export default UserContext;