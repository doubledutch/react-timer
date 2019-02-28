import React from 'react'
import SharedTimer from './index'
import renderer from 'react-test-renderer'

const getTime = () => new Date('1983-04-26T00:00:00')
const targetTime = new Date('1983-04-26T01:02:03')

test('SharedTimer without Wrapper renders bare text', () => {
  const component = renderer.create(<SharedTimer getTime={getTime} targetTime={targetTime} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('SharedTimer with past targetTime renders time since', () => {
  const component = renderer.create(<SharedTimer getTime={getTime} targetTime={new Date('1983-04-25T00:00:00')} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('SharedTimer renders m:ss', () => {
  const component = renderer.create(<SharedTimer getTime={getTime} targetTime={new Date('1983-04-26T00:03:45')} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('SharedTimer renders 0:ss', () => {
  const component = renderer.create(<SharedTimer getTime={getTime} targetTime={new Date('1983-04-26T00:00:12')} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('SharedTimer defaults getTime to () => new Date()', () => {
  const component = renderer.create(<SharedTimer targetTime={new Date()} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('SharedTimer defaults targetTime to new Date()', () => {
  const component = renderer.create(<SharedTimer />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

const Timer = props => (
  <SharedTimer
    {...props}
    Wrapper="span"
    wrapperProps={{className: props.className}}
  />
)

test('Timer with span Wrapper renders text in span', () => {
  const component = renderer.create(<Timer getTime={getTime} targetTime={targetTime} className="my-class" />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

const TestComponent = ({children, className}) => (
  <div className={className}>T minus {children}</div>
)

const ComponentWrappedTimer = props => (
  <SharedTimer
    {...props}
    Wrapper={TestComponent}
    wrapperProps={{className: props.className}}
  />
)

test('Timer with component Wrapper renders text in component', () => {
  const component = renderer.create(<ComponentWrappedTimer getTime={getTime} targetTime={targetTime} className="my-class" />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
