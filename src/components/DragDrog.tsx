import React from 'react'
import { css, cx } from '@emotion/css';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DraggableProvidedDragHandleProps, DraggableProvided } from '@hello-pangea/dnd';

export type OnDragEnd = (sourceIndex: number, destinationIndex: number) => void;

type Prpos<ListItemType> = {
  className?: string;
  draggable?: boolean;
  draggableDisabled?: boolean;
  labelListEmpty?: string;
  onDragEnd?: OnDragEnd;
  renderListEmpty?: () => JSX.Element;
  list: Array<ListItemType>;
  renderRow: (item: ListItemType, index: number, dragHandleProps: DraggableProvidedDragHandleProps | null) => React.ReactNode;
}

function DragDrog<ListItemType> (props: Prpos<ListItemType>) {
  const [droppableID] = React.useState<string>(uuidv4());

  const handleDargEnd: (result: DropResult, provided: ResponderProvided) => void = result => {
    if (!result.destination) return;
    if (!props.onDragEnd) return;
    props.onDragEnd(result.source.index, result.destination.index);
  };

  // 鎖定拖曳物件，只能於垂直區域內移動
  const lockAreaY = (provided: DraggableProvided) => {
    const transform = provided.draggableProps?.style?.transform;
    if (transform) {
      const t = transform.split(',')[1];
      if (provided.draggableProps.style) {
        provided.draggableProps.style.transform = `translate(0px,${t}`;
      }
    }
  };

  return <div className={cx('DT-DragDrog', style, props.className)}>
    <DragDropContext onDragEnd={handleDargEnd}>
      <Droppable isDropDisabled={props.draggableDisabled} droppableId={droppableID}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cx('dd-droppable', snapshot.isDraggingOver && 'dragging-over')}
          >
            {props.list.map((item, index) => 
              <Draggable key={index} draggableId={index.toString()} index={index}>
                {(provided, snapshot) => {

                  lockAreaY(provided);

                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cx('dd-drappable', snapshot.isDragging && "dragging")}
                    >
                      {props.renderRow(item, index, provided.dragHandleProps)}
                    </div>
                  )
                }}
              </Draggable>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>
}

export default DragDrog;

const style = css`
  width: 100%;
  
  .dragging-over {
  }

  .dragging {
  }
`;