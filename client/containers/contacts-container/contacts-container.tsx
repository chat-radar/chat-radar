import * as React from 'react';
import { Sidebar, SidebarHeader, SidebarHeaderRow, SidebarHeaderCol, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { MainMenu } from '../../components/main-menu';
import { TrackableLink } from '../../components/trackable-link';
import { UISref } from 'ui-router-react';

class ContactsContainer extends React.Component<{}, {}> {

  render() {
    return (
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderRow>
            <SidebarHeaderCol>
              <UISref to='chats'>
                <a className='sidebar-header-nav-link fa fa-2x fa-angle-left' />
              </UISref>
            </SidebarHeaderCol>
            <SidebarHeaderCol expand={true}>
              <h1>Chat Radar</h1>
            </SidebarHeaderCol>
            <SidebarHeaderCol>
              <MainMenu />
            </SidebarHeaderCol>
          </SidebarHeaderRow>
        </SidebarHeader>
        <SidebarContent>
          <p>
            Для добавления новых чатов, а так же по любым другим вопросам,
            свяжитесь по этому e-mail адресу: <a href='mailto:chatradar@yandex.ru'>chatradar@yandex.ru</a>,
            либо с помощью <TrackableLink href='https://github.com/chat-radar/chat-radar' label='GitHub'>GitHub</TrackableLink>.
          </p>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default ContactsContainer;
