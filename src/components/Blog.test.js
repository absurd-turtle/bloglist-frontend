import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author by default but not url and likes', () => {
  const blog = {
    id: 'randomBlogId',
    title: 'Component testing is done with react-testing-library',
    author: 'some guy',
    url: 'testUrl',
    likes: 2,
    user: {
      id: 'someid',
      name: 'random user',
      username: 'randomUser'
    }
  }

  const like = jest.fn()
  const remove = jest.fn()

  render(<Blog blog={blog} like={like} remove={remove} />)

  const element = screen.getByText('Component testing is done with react-testing-library some guy')
  const likes = screen.queryByTestId('likes')
  const url = screen.queryByTestId('url')
  expect(likes).toBeNull()
  expect(url).toBeNull()
  expect(element).toBeDefined()
})

test('renders url and likes when view is clicked', async () => {
  const blog = {
    id: 'randomBlogId',
    title: 'Component testing is done with react-testing-library',
    author: 'some guy',
    url: 'testUrl',
    likes: 2,
    user: {
      id: 'someid',
      name: 'random user',
      username: 'randomUser'
    }
  }

  const like = jest.fn()
  const remove = jest.fn()

  render(<Blog blog={blog} like={like} remove={remove} />)

  const likes = screen.queryByTestId('likes')
  const url = screen.queryByTestId('url')

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  expect(likes).toBeDefined()
  expect(url).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    id: 'randomBlogId',
    title: 'Component testing is done with react-testing-library',
    author: 'some guy',
    url: 'testUrl',
    user: {
      id: 'someid',
      name: 'random user',
      username: 'randomUser'
    }
  }

  const like = jest.fn()
  const remove = jest.fn()

  render(
    <Blog blog={blog} like={like} remove={remove} />
  )

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(like.mock.calls).toHaveLength(2)
})
