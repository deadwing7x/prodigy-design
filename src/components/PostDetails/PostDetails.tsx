/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IComment } from "../../model/IComment";
import PostContext from "../../PostContext";
import UserContext from "../../UserContext";
import "./PostDetails.scss";

const PostDetails: React.FC<{}> = () => {
  const baseUrl: string = "https://jsonplaceholder.typicode.com";
  let { id } = useParams<any>();
  id = id?.split(":")[1];
  let history = useHistory();
  const posts = useContext(PostContext);
  const users = useContext(UserContext);
  const [comments, setComments] = useState<IComment[]>([]);
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

  const getComments = () => {
    const request = axios.get(`${baseUrl}/posts/${id}/comments`);

    return request;
  };

  useEffect(() => {
    getComments()
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const deletePost = (id: number) => {
    const request = axios.delete(`${baseUrl}/posts/${id}`);

    return request;
  };

  const deletePostHandler = (id: number) => {
    setDeleteClicked(true);

    deletePost(id)
      .then((response) => {
        if (response.status === 200) {
          history.push("/posts");
        }
      })
      .catch((err) => {
        console.error("Failed to delete post! Please try again later.", err);
      });
  };

  return (
    <div className="post-details">
      {posts
        .filter((post) => {
          return post.id === parseInt(id);
        })
        .map((post, i) => {
          return (
            <>
              <div className="single-post" key={i}>
                <div className="post-title">
                  {post.title}{" "}
                  <span
                    className="delete-post"
                    onClick={() => {
                      deletePostHandler(post.id);
                    }}
                  >
                    {deleteClicked ? (
                      <i className="fas fa-spinner fa-spin fa-xs"></i>
                    ) : (
                      <i className="fas fa-trash-alt fa-xs"></i>
                    )}
                  </span>
                </div>
                <div className="post-body">{post.body}</div>
                <p className="post-details-header">
                  Written by{" "}
                  {users
                    .filter((user) => {
                      return user.id === post.userId;
                    })
                    .map((user) => {
                      return user.name;
                    })}
                </p>
              </div>
              <p className="comments-text">Comments:</p>
              {comments.map((comment, i) => {
                return (
                  <div className="single-comment" key={i}>
                    <div className="comment-name">
                      <strong>Name:</strong> {comment.name}
                    </div>
                    <div className="comment-email">
                      <strong>Email:</strong> {comment.email}
                    </div>
                    <div className="comment-body">{comment.body}</div>
                  </div>
                );
              })}
            </>
          );
        })}
    </div>
  );
};

export default PostDetails;
