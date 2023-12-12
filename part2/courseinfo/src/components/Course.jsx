import React from 'react'

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Total = (props) => {
    return <p><b> total of {props.sumOfExercises} exercises </b></p>
}

const Part = ({ part }) => {
return (
    <p>
        {part.name} {part.exercises}
    </p>
)
}

const Content = ({ parts }) => {
return (
    <div>
        {parts.map((part) => (
            <Part part={part} key={part.id}/>
        ))}
    </div>
)
}

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total sumOfExercises={course.parts.reduce((sum, part) => { return sum + part.exercises}, 0)} />
    </div>
)

export default Course