import React from 'react'
import ReactDOM from 'react-dom'

// Ejercicios: 2.1.-2.5.
const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Content = ({ parts = [] }) => {
  return (
    <div>
      {parts.map(part => {
        return <p key={part.id}>{part.name} {part.exercises}</p>
      })}
    </div>
  )
}

const Total = ({ parts = [] }) => {

  let total = 0;
  parts.forEach(part => {
    total += part.exercises
  });

  return <p><strong>Total of {total} exercises</strong></p>
}

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return <Courses courses={courses} />
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)