import './header.css';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { User } from '../types';
import { UserIcon } from './icons';
import { UserDetails } from './details';
import { Text } from '@radix-ui/themes';
import Logo64Png from '../assets/logo64.png';

export const Header = ({ user }: { user?: User }) => {
    return (
        <header className="header-container">
            <div className="logo-and-nav">
                <span className="header-logo">
                    <img src={Logo64Png} />
                </span>
                <NavigationMenu.Root className="">
                    <NavigationMenu.List className="flex">
                        <NavigationMenu.Item
                            key="about"
                            className="nav-menu-item"
                        >
                            <NavigationMenu.Link href="/campaign">
                                <Text className="header-logo-text">
                                    Campaign
                                </Text>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            key="about"
                            className="nav-menu-item"
                        >
                            <NavigationMenu.Link href="/challenges">
                                <Text className="header-logo-text">
                                    Challenges
                                </Text>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            key="about"
                            className="nav-menu-item"
                        >
                            <NavigationMenu.Link href="/about">
                                <Text className="header-logo-text">About</Text>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            key="about"
                            className="nav-menu-item"
                        >
                            <NavigationMenu.Link href="/contact">
                                <Text className="header-logo-text">
                                    Contact
                                </Text>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    </NavigationMenu.List>
                </NavigationMenu.Root>
            </div>
            <NavigationMenu.Root className="logo-and-nav">
                <NavigationMenu.Item key="account" className="relative flex">
                    <NavigationMenu.Trigger className="">
                        <UserIcon />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="w-max absolute right-0 top-10 py-[10px] px-4 bg-white border-[1px] border-gray-med rounded-lg z-20">
                        <UserDetails user={user} />
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        </header>
    );
};
