const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({part, exe}) => {
  return <p> {part} {exe} </p>
}

const Total = ({parts}) => {
  return <p> Number of exercises {parts[0] + parts[1] + parts[2]} </p>

}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0].name} exe={parts[0].exercises}/>
      <Part part={parts[1].name} exe={parts[1].exercises}/>
      <Part part={parts[2].name} exe={parts[2].exercises}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
export default App