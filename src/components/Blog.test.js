import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
jest.mock('../services/blogs')
import Blog from './Blog'

const handleUpdatedBlog = updatedBlog => {
  console.log(updatedBlog)
}

const handleDeletedBlog = deletedBlog => {
  console.log(deletedBlog)
}

const handleError = error => {
  console.log(error)
}

test('renders content when collapsed', () => {
  const user = {
    username: 'abcdef'
  }

  const blog = {
    title: 'Blog title',
    author: 'Author name',
    url: 'http://url.com',
    likes: 19,
    user: {
      username: 'abcdef'
    },
    id: '141243124'
  }

  const component = render(
    <Blog user={user} blog={blog}
      handleUpdatedBlog={handleUpdatedBlog}
      handleDeletedBlog={handleDeletedBlog}
      handleError={handleError} />
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.likes)
  expect(component.container).not.toHaveTextContent(blog.user.username)
})

test('renders right content when expanded', async () => {
  const user = {
    name: 'David',
    username: 'davimuri'
  }

  const blog = {
    title: 'Blog title',
    author: 'Author name',
    url: 'http://url.com',
    likes: 19,
    user: {
      name: 'David',
      username: 'davimuri'
    },
    id: '141243124'
  }


  const component = render(
    <Blog user={user} blog={blog}
      handleUpdatedBlog={handleUpdatedBlog}
      handleDeletedBlog={handleDeletedBlog}
      handleError={handleError} />
  )

  const collapsedDiv = component.getByTestId('collapsedDiv')
  fireEvent.click(collapsedDiv)

  const expandedDiv = await waitForElement(
    () => component.getByTestId('expandedDiv'))

  //console.log(prettyDOM(expandedDiv))

  expect(expandedDiv).toHaveTextContent(blog.title)
  expect(expandedDiv).toHaveTextContent(blog.author)
  expect(expandedDiv).toHaveTextContent(blog.likes)
  expect(expandedDiv).toHaveTextContent(blog.user.name)
})

test('likes button calls handler right amount of times', async () => {
  const user = {
    name: 'David',
    username: 'davimuri'
  }

  const blog = {
    title: 'Blog title',
    author: 'Author name',
    url: 'http://url.com',
    likes: 19,
    user: {
      name: 'David',
      username: 'davimuri'
    },
    id: '141243124'
  }

  const mockHandleUpdatedBlog = jest.fn()
  const mockHandleError = jest.fn()

  const component = render(
    <Blog user={user} blog={blog}
      handleUpdatedBlog={mockHandleUpdatedBlog}
      handleDeletedBlog={handleDeletedBlog}
      handleError={mockHandleError} />
  )

  const collapsedDiv = component.getByTestId('collapsedDiv')
  fireEvent.click(collapsedDiv)

  const expandedDiv = await waitForElement(
    () => component.getByTestId('expandedDiv'))

  console.log(prettyDOM(expandedDiv))

  const likeButton = component.getByTestId('likeButton')
  await fireEvent.click(likeButton)

  expect(mockHandleUpdatedBlog.mock.calls.length).toBe(1)
})
