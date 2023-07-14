import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// import { moveIssue } from '../../actions/board';
import { getProject } from '../../actions/board';
import { getLists } from '../../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';
import List from '../list/List';
import CreateList from '../board/CreateList';
import Navbar from '../other/Navbar';
import { useParams } from 'react-router-dom';

const Board = () => {
  
  const board = useSelector((state) => state?.board?.project);
  const lists = useSelector((state) => state?.board?.lists);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const { id } = useParams();

  // console.log(id, "id of the project");
  // console.log(board, "the whole project");
  console.log(lists, "lists in frontend, banana")

  useEffect(() => {
    dispatch(getProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch])

  useEffect(() => {
    if (board?.title) document.title = board.title + ' | CodeCorners PMA';
  }, [board?.title]);

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  // const onDragEnd = (result) => {
  //   const { source, destination, draggableId, type } = result;
  //   if (!destination) {
  //     return;
  //   }
  //   // if (type === 'card') {
  //   //   dispatch(
  //   //     moveIssue(draggableId, {
  //   //       fromId: source.droppableId,
  //   //       toId: destination.droppableId,
  //   //       toIndex: destination.index,
  //   //     })
  //   //   );
  //   // } 
  //   // else {
  //   //   dispatch(moveList(draggableId, { toIndex: destination.index }));
  //   // }
  // };

  return !board ? (
    <>
      <Navbar />
      <Box className='board-loading'>
        <CircularProgress />
      </Box>
    </>
  ) : (
    <div
      className='board-and-navbar'
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80)'}}
    >
      <Navbar />
      <section className='board'>
        <div className='board-top'>
          <div className='board-top-left'>
            <BoardTitle board={board} />
          </div>
        </div>
        {/* <DragDropContext onDragEnd={onDragEnd}> */}
          {/* <Droppable droppableId='all-lists' direction='horizontal' type='list'> */}
            {/* {(provided) => ( */}
              <div className='lists' >
                {lists.map((listItem, index) => (
                  <List key={listItem.id} listId={listItem.id} index={index} />
                ))}
                {/* {provided.placeholder} */}
                <CreateList />
              </div>
            {/* )} */}
          {/* </Droppable> */}
        {/* </DragDropContext> */}
      </section>
    </div>
  );
};

export default Board;
