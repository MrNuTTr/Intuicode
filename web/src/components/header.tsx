import './header.css';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { Cart, User } from '../types';
import { UserIcon } from './icons';
import { UserDetails } from './details';
import Logo64Png from '../assets/logo64.png';

export const Header = ({ cart, user }: { cart: Cart; user?: User }) => {
    return (
        <header className="bg-gray-700 p-5 w-100 flex justify-between items-center">
            <div className="header-logo">
                <img src={Logo64Png} width="64" />
            </div>
            <NavigationMenu.Root className="">
                <NavigationMenu.List className="flex gap-[10px] items-center justify-between text-xl">
                    <NavigationMenu.Item key="about" className="">
                        <NavigationMenu.Link
                            className="flex items-center pr-5 text-white hover:text-yellow"
                            href="/campaign"
                        >
                            Campaign
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item key="about" className="">
                        <NavigationMenu.Link
                            className="flex items-center pr-5 text-white hover:text-yellow"
                            href="/challenges"
                        >
                            Challenges
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item key="about" className="">
                        <NavigationMenu.Link
                            className="flex items-center pr-5 text-white hover:text-yellow"
                            href="/about"
                        >
                            About
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item key="about" className="">
                        <NavigationMenu.Link
                            className="flex items-center pr-5 text-white hover:text-yellow"
                            href="/contact"
                        >
                            Contact
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item
                        key="account"
                        className="relative flex"
                    >
                        <NavigationMenu.Trigger className="">
                            <UserIcon />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="w-max absolute right-0 top-10 py-[10px] px-4 bg-white border-[1px] border-gray-med rounded-lg z-20">
                            <UserDetails user={user} />
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                </NavigationMenu.List>
            </NavigationMenu.Root>
        </header>
    );
};
