import {Link} from 'react-router';
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
		const Item = Menu.Item,
			SubMenu = Menu.SubMenu,
			MenuItemGroup = Menu.ItemGroup;

		return (
			<div className={this.state.collapsed ? 'nav-side fold' : 'nav-side unfold'}>
				<Button className="toggle-button" type="primary" onClick={this.toggleCollapsed}>
					<Icon type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'} />
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
						<Item key="1"><Link to="/articles"><Icon type="caret-right" /> <Icon type="right" />文章列表</Link></Item>
						<Item key="2"><Link to="/new-article"><Icon type="caret-right" />文章添加<Icon type="right" /></Link></Item>
					</SubMenu>
					<SubMenu key="sub2" 
						title={
							<span>
								<Icon type="inbox" />
								<span>收藏管理</span>
							</span>
						}
					>
						<Item key="4"><Link to="/gather"><Icon type="caret-right" />收藏列表<Icon type="right" /></Link></Item>
						<Item key="5"><Link to="/new-gather"><Icon type="caret-right" />收藏添加<Icon type="right" /></Link></Item>
					</SubMenu>
					<SubMenu key="sub3" 
						title={
							<span>
								<Icon type="share-alt" />
								<span>说说管理</span>
							</span>
						}
					>
						<Item key="6"><Link to="/gossip"><Icon type="caret-right" />说说列表<Icon type="right" /></Link></Item>
						<Item key="7"><Link to="/new-gossip"><Icon type="caret-right" />说说添加<Icon type="right" /></Link></Item>
					</SubMenu>
				</Menu>
			</div>
		)
	}
}

export default NavSide;