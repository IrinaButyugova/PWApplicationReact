import Button from "react-bootstrap/Button";

export default function PWButton(props) {
    return (
        <Button
            variant={props.variant ? props.variant : "primary"}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </Button>
    );
}
