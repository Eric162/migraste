import { Button } from "@mui/material";
import { Input, Button as CorrectButton } from "@prep/design-system";

const MyComponent: React.FC = () => {
    return (
        <>
            <Button>Click Me</Button>
            <Input />
            <Button>Click Me</Button>
            <CorrectButton> MATCH </CorrectButton>
        </>
    )
}