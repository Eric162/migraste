import { Button } from "@mui/material";
import { Input, Button as AliasedButton } from "@prep/design-system";
import AnotherButton from "@prep/design-system/Button";

const MyComponent: React.FC = () => {
    return (
        <>
            <Button>Click Me</Button>
            <Input />
            <Button>Click Me</Button>
            <AliasedButton> MATCH </AliasedButton>
            <AnotherButton> ANOTHER MATCH </AnotherButton>
        </>
    )
}