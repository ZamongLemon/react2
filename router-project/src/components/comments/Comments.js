import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const { quoteId } = params;
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);
  let comments;
  if (status === "pending") {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && loadedComments) {
    console.log(loadedComments);
    comments = <CommentsList comments={loadedComments} />;
  }
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className='centered'>No comments were added yet!</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
