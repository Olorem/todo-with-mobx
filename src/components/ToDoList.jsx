import { observer } from 'mobx-react';
import { Button, Typography, Space, Checkbox, List, Form, Select, Input, Progress } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;

const N = 15;
const filterTypes = ['All', 'Completed', 'Current'];

export const ToDoList = observer(({ ToDoStore }) => {
  

  return (
    <div>
      {/* {ToDoStore.report}
      <br/>
      <Checkbox.Group>
        {
          ToDoStore.todos.map((todo) => (
            
              <Checkbox onClick={() => ToDoStore.toggleTodo(todo.id)}>
                <Title  delete>{todo.task}</Title>
                <CloseOutlined onClick={() => ToDoStore.deleteTodo(todo.id)}/>
              </Checkbox>
          ))
        }
      </Checkbox.Group> 
      <br/> */}
      <Progress type="circle" 
        percent={Math.round((ToDoStore.completedToDosCount/ToDoStore.todosLength)*100)}
        format={(percent) => `${percent}%`}
        style={{marginBottom: 20}} />
      <br/>
      <List
        header={<Title level={5} style={{ margin: '0' }} >{ToDoStore.report}</Title>}
        footer={<ToDoFooter ToDoStore={ToDoStore}/>}
        bordered
        dataSource={ToDoStore.todos}
        renderItem={(item) => (
          <List.Item >
            <Checkbox
              onClick={() => ToDoStore.toggleTodo(item.id)}
              checked={item.completed}
              style={{ width: '100%' }}>
              <Typography.Text delete={item.completed}>{item.task}</Typography.Text>
            </Checkbox>
            <CloseOutlined onClick={() => ToDoStore.deleteTodo(item.id)} />
          </List.Item>
        )}
      />


    </div>
  )
})

const ToDoFooter = observer(({ToDoStore}) => {
  const addTodoHandler = () => {
    if (ToDoStore.addTodoInput.length <= N && ToDoStore.addTodoInput.length > 0)
      ToDoStore.addTodo(ToDoStore.addTodoInput);
    else
      alert('Слишком длинное сообщение(либо пустое)')
    ToDoStore.updateInput('');
  }
  const changeHandler = e => {
    ToDoStore.updateInput(e.target.value);
  }
  const keyHandler = e => {
    if(e.code === 'Enter')
      addTodoHandler();
  }
  // const selectHandler = e => {
  //   ToDoStore.updateSelect(filterTypes.findIndex(x => x === e.target.value));
  // }
  const selectHandler = str => {
    ToDoStore.updateSelect(filterTypes.findIndex(x => x === str));
  }

  return (
    <Space >
      <Button type='primary' onClick={addTodoHandler} style={{ width: 80 }}>Add task</Button>
      <Input type='text' value={ToDoStore.addTodoInput} onChange={changeHandler} onKeyDown={keyHandler}/>
      {/* <Select 
          value={filterTypes[ToDoStore.filterType]}
          style={{width: '100px'}}
          onChange={selectHandler}>
          <Select.Option value='Все'>Все</Select.Option>
          <Select.Option value='Выполненные'>Выполненные</Select.Option>
          <Select.Option value='Невыполненные'>Невыполненные</Select.Option>
        </Select> */}
      <Select
        defaultValue={filterTypes[0]}
        style={{ width: 80 }}

        options={filterTypes.map(x => ({ value: x, label: x }))}
        onChange={selectHandler}
      />
    </Space>
  )
})