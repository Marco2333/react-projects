import React, {Component} from 'react';

import {Menu, Icon, Button} from 'antd';

import './index.scss';

class NavSide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		}
	}
	
	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

    render() {
        const SubMenu = Menu.SubMenu;
        const MenuItemGroup = Menu.ItemGroup;

        return (
            <div className="nav-side">
				<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
					<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
				</Button>
                <Menu
					mode="inline"
					theme="dark"
					inlineCollapsed={this.state.collapsed}
				>
					<SubMenu key="sub1" 
						title={
							<span>
								<Icon type="file-text" />
								<span>文章管理</span>
							</span>
						}
					>
						<Menu.Item key="1">文章列表</Menu.Item>
						<Menu.Item key="2">文章添加</Menu.Item>
						<Menu.Item key="3">文章分类</Menu.Item>
					</SubMenu>
					<SubMenu key="sub2" 
						title={
							<span>
								<Icon type="inbox" />
								<span>收藏管理</span>
							</span>
						}
					>
						<Menu.Item key="4">收藏列表</Menu.Item>
						<Menu.Item key="5">收藏添加</Menu.Item>
					</SubMenu>
					<SubMenu key="sub3" 
						title={
							<span>
								<Icon type="share-alt" />
								<span>收藏管理</span>
							</span>
						}
					>
						<Menu.Item key="6">收藏列表</Menu.Item>
						<Menu.Item key="7">收藏添加</Menu.Item>
					</SubMenu>
					<SubMenu key="sub4" 
						title={
							<span>
								<Icon type="user" />
								<span>个人中心</span>
							</span>
						}
					>
						<Menu.Item key="8">密码修改</Menu.Item>
					</SubMenu>
                </Menu>
            </div>
        )
    }
}

export default NavSide;