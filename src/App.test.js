import React from 'react'
import { Provider } from 'react-redux'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
import store from './store'

test('if no user logged, blogs are rendered', async () => {
  const component = render(<Provider store={store}><App /></Provider>)
  component.rerender(<Provider store={store}><App /></Provider>)

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

  const component = render(<Provider store={store}><App /></Provider>)
  component.rerender(<Provider store={store}><App /></Provider>)

  await waitForElement(
    () => component.container.querySelector('.blog')
  )

  const blogs = component.container.querySelectorAll('.blog')
  expect(blogs.length).toBe(3)
})
