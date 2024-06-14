import './header.css';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { UserIcon } from './icons';
import { Text } from '@radix-ui/themes';
import Logo64Png from '../assets/logo64.png';

export const Header = () => {
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
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        </header>
    );
};
