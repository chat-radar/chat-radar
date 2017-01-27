import * as React from 'react';
import { Sidebar, SidebarHeader, SidebarHeaderRow, SidebarHeaderCol, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { MainMenu } from '../../components/main-menu';
import { UISref } from 'ui-router-react';

class AboutContainer extends React.Component<{}, {}> {

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
          <p>С помощью бота Chat Radar ты можешь отметить свое местоположение и найти друзей поблизости.</p>
          <p>Для того, чтобы отметиться на карте, напиши <code>Chat Radar мой город &lt;город&gt;</code> в любом чате, где есть бот Chat Radar. Отправь <code>Chat Radar справка</code> для просмотра всех доступных команд.</p>
          <p>Список всех чатов можно найти на <UISref to='chats'><a>главной странице</a></UISref>. Для добавления нового чата, пожалуйста свяжитесь со мной через <UISref to='contacts'><a>форму обратной связи</a></UISref>.</p>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default AboutContainer;
