import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, number }) => (
  <tr>
    <td>{text}</td>
    <td>{number}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
        <StatisticLine text='good' number={good}></StatisticLine>
        <StatisticLine text='neutral' number={neutral}></StatisticLine>
        <StatisticLine text='bad' number={bad}></StatisticLine>
        <StatisticLine text='all' number={good + neutral + bad}></StatisticLine>
        <StatisticLine text='average' number={(good - bad)/3}></StatisticLine>
        <StatisticLine text='positive' number={good / (good + neutral + bad)}></StatisticLine>
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1> give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text='good'></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'></Button>
      <Button handleClick={() => setBad(bad + 1)} text='bad'></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} ></Statistics>
    </>
  )
}

export default App