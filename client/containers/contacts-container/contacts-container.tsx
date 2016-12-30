import * as React from 'react';
import { Sidebar, SidebarHeader, SidebarHeaderRow, SidebarHeaderCol, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { MainMenu } from '../../components/main-menu';
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
          <p>Любые пожелания, вы можете отправлять на мой e-mail: <a href='mailto:chatradar@yandex.ru'>chatradar@yandex.ru</a></p>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default ContactsContainer;
