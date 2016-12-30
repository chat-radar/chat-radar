import * as React from 'react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '../../components/sidebar';
// import { UISref } from 'ui-router-react';

class AboutContainer extends React.Component<{}, {}> {

  render() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <p>Привет, я бот Hubot. С помощью Hubot ты можешь отметить свое местоположение и найти друзей поблизости.</p>
          <p>Для просмотра всех команд напиши `hubot справка`, а карту чата можно найти здесь:/</p>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default AboutContainer;
