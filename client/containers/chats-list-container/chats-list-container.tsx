import * as React from 'react';
import IChatsListContainerProps from './i-chats-list-container-props';
import { observer, inject } from 'mobx-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { Chat } from '../../api';
import { UISref } from 'ui-router-react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from '../../components/list-group';
import { Spinner } from '../../components/spinner';

@inject('chatStore')
@observer
class ChatsListContainer extends React.Component<IChatsListContainerProps, {}> {

  renderEmpty() {
    return (<SidebarContent>Чатов пока нет</SidebarContent>);
  }

  renderSpinner() {
    return (<Spinner />);
  }

  renderList() {
    if (this.props.chatStore.isFetching)
      return this.renderSpinner();

    if (this.props.chatStore.chats.length < 1)
      return this.renderEmpty();

    const items = this.props.chatStore.chats.map((chat: Chat) => {
      return (
        <UISref key={chat.id} to='chats.cities' params={{chatId: chat.id}}>
          <ListGroupItem>
            <ListGroupItemHeading>{chat.get('title')}</ListGroupItemHeading>
            <ListGroupItemText>
              <span className='text-muted'>{chat.get('chatId')}</span>
            </ListGroupItemText>
          </ListGroupItem>
        </UISref>
      );
    });

    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }

  render() {
    return (
      <Sidebar>
        <SidebarHeader />
        {this.renderList()}
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default ChatsListContainer;
