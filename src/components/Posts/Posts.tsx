import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import PostContext from "../../PostContext";
import UserContext from "../../UserContext";
import "./Posts.scss";

interface PostProps {
  title: string;
  body: string;
  id: number;
}

const PostContent: React.FC<PostProps> = (props: PostProps) => {
  return (
    <div className="single-post" key={props.id}>
      <div className="post-title">
        {props.title}{" "}
        <a href={`/post-details/:${props.id}`}>
          <i className="fas fa-external-link-alt fa-xs"></i>
        </a>
      </div>
      <div className="post-body">{props.body}</div>
    </div>
  );
};

const Posts: React.FC<{}> = () => {
  let { id } = useParams<any>();
  id = id?.split(":")[1];
  const posts = useContext(PostContext);
  const users = useContext(UserContext);

  return (
    <div className="col-md-12">
      <p className="post-details-header">
        {id
          ? users
              .filter((user) => {
                return user.id === parseInt(id);
              })
              .map((user) => {
                return user.name;
              })
          : ""}
      </p>
      <div className="posts">
        {id
          ? posts
              .filter((post) => {
                return post.userId === parseInt(id);
              })
              .map((post, i) => {
                return (
                  <PostContent
                    title={post.title}
                    body={post.body}
                    id={post.id}
                  />
                );
              })
          : posts.map((post, i) => {
              return (
                <PostContent title={post.title} body={post.body} id={post.id} />
              );
            })}
      </div>
    </div>
  );
};

export default Posts;
