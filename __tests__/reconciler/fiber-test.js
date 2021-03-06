import { render, Component } from '../../reconciler/fiber';
import h from '../../render/h';

const getRootNode = () => {
  document.body.innerHTML = '<div id="root"></div>';
  const $root = document.getElementById('root');
  return $root;
}

describe('fiber render test', () => {

  test('mount element which type is string', () => {
    const $root = getRootNode();

    const element = (<div style="color: red">hello world</div>);

    render(element, $root);

    const expectHTML = '<div style="color: red">hello world</div>';
    expect($root.innerHTML).toBe(expectHTML);
  });

  test('mount element which type is pure function', () => {
    const $root = getRootNode();
    const Container = ({ name }) => (<h1>{`hello ${name}`}</h1>)

    const element = <Container name="xiaowei" />

    render(element, $root);

    const expectHTML = '<h1>hello xiaowei</h1>';
    expect($root.innerHTML).toBe(expectHTML);
  });


  test('mount element which type is class', () => {
    const $root = getRootNode();
    class Container extends Component {
      render() {
        const { name } = this.props;
        return (<h1>{`hello ${name}`}</h1>);
      }
    }

    const element = <Container name="xiaowei" />

    render(element, $root);

    const expectHTML = '<h1>hello xiaowei</h1>';
    expect($root.innerHTML).toBe(expectHTML);
  });
})

describe('setState test', () => {

  test('state change', () => {
    const $root = getRootNode();
    class Container extends Component {
      constructor(props) {
        super(props);

        this.state = {
          count: 0
        }
      }

      componentDidMount() {
        this.setState({
          count: this.state.count + 1
        })
      }

      render() {
        const { count } = this.state;

        return (<h1 id="count">{count}</h1>);
      }
    }

    const element = <Container />;

    render(element, $root);

    const expectHTML = '<h1 id="count">1</h1>';
    expect($root.innerHTML).toBe(expectHTML);
  })
})
