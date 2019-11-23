import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

test('if no user logged, blogs are rendered', async () => {
  const component = render(<App />)
  component.rerender(<App />)

  await waitForElement(
    () => component.container.querySelector('.blog')
  )

  const blogs = component.container.querySelectorAll('.blog')
  expect(blogs.length).toBe(3)
})

test('if user logged, blogs are rendered', async () => {
  const user = {
    username: 'davimuri',
    token: '1231231214',
    name: 'David'
  }

  localStorage.setItem('BlogListAppLoggedUser', JSON.stringify(user))

  const component = render(<App />)
  component.rerender(<App />)

  await waitForElement(
    () => component.container.querySelector('.blog')
  )

  const blogs = component.container.querySelectorAll('.blog')
  expect(blogs.length).toBe(3)
})
