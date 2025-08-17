interface GreetingProps {
    name: string;
    messageCount: number;
}

export default function Greeting(props: GreetingProps) {
    return <div>Hello {props.name} ! You have {props.messageCount} messages.</div>;
}
