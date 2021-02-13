import React from 'react';
import { IPost } from './model/IPost';

const PostContext = React.createContext<IPost[]>([]);

export default PostContext;