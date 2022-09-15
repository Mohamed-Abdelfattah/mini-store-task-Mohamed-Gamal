import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type NotFoundProps = RouteComponentProps & {
  children?: React.ReactNode;
};

export default class NotFound extends React.Component<
  NotFoundProps,
  { counter: number }
> {
  constructor(props: NotFoundProps) {
    super(props);
    this.state = { counter: 5 };
  }

  countdownId: NodeJS.Timer | null = null;

  componentDidMount() {
    this.countdownId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentDidUpdate(
    prevProps: Readonly<NotFoundProps>,
    prevState: Readonly<{ counter: number }>,
    snapshot?: any
  ): void {
    if (prevState.counter === 0) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount(): void {
    if (this.countdownId) clearInterval(this.countdownId);
  }

  tick = () => {
    this.setState((prev) => ({ counter: prev.counter - 1 }));
  };

  render(): React.ReactNode {
    return (
      <>
        <p>There's nothing here</p>
        {this.props.children}
        <p>you will be redirected in {this.state.counter}</p>
      </>
    );
  }
}
