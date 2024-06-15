import { Button, Dialog, Flex, Link } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FaGithub, FaMicrosoft } from "react-icons/fa";
import "./login-button.css";

const LoginButton = () => (
    <Dialog.Root>
        <Dialog.Trigger>
            <Button variant="soft">
                Sign in
            </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
            <Dialog.Title align="center">Sign in with</Dialog.Title>
            
            <Flex direction="column" gap="3">
                <Button size="3" variant="surface" className="loginButton" asChild>
                    <Link href="/.auth/login/aad" underline="none">
                        <FaMicrosoft />
                        Microsoft
                    </Link>
                </Button>

                <Button size="3" variant="surface" className="loginButton" asChild>
                    <Link href="/.auth/login/github" underline="none">
                        <FaGithub />
                        Github
                    </Link>
                </Button>

                <Link href="/about#faq" target="_blank" className="center">
                    Why can't I make an account?
                </Link>
            </Flex>

            <Dialog.Close>
                <Button variant="ghost" className="closeButton">
                    <Cross2Icon />
                </Button>
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
);

export default LoginButton;

