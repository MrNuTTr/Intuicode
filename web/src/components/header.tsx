import './header.css';
import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { UserIcon } from './icons';
import LoginButton from './login-button';
import { Button, Text } from '@radix-ui/themes';
import Logo64Png from '../assets/logo64.png';

export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleLogin = () => {
        // Handle login here
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Handle logout here
        setIsLoggedIn(false);
    };

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
            {isLoggedIn ? (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item onSelect={() => console.log('Do something')}>Item 1</DropdownMenu.Item>
                        <DropdownMenu.Item onSelect={() => console.log('Do something else')}>Item 2</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            ) : (
                <LoginButton></LoginButton>
            )}
        </header>
    );
};
