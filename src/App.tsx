import { useEffect, useState, type ReactNode } from 'react'
import type { BlogPost } from './components/BlogPosts.tsx'
import { get } from './util/http.ts'
import BlogPosts from './components/BlogPosts.tsx'
import fetchingImg from './assets/data-fetching.png'
import ErrorMessage from './components/ErrorMessage.tsx'

type RawDataBlogPost = {
  id: number
  title: string
  body: string
  userId: number
}

function App() {
  const [fetchedPost, setFetchedPost] = useState<BlogPost[]>()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true)
      try {
        const data = await get<RawDataBlogPost[]>(
          'https://jsonplaceholder.typicode.com/posts',
        )

        const blogPosts: BlogPost[] = data.map((rawPost) => ({
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body,
        }))

        setFetchedPost(blogPosts)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      }

      setIsFetching(false)
    }

    fetchPosts()
  }, [])

  let content: ReactNode

  if (error) {
    content = <ErrorMessage text={error} />
  }

  if (fetchedPost) {
    content = <BlogPosts posts={fetchedPost} />
  }

  if (isFetching) {
    content = <p id='loading-fallback'>Fetching post...</p>
  }

  return (
    <main>
      <img
        src={fetchingImg}
        alt='An abstract image depicting a data fetching process'
      />
      {content}
    </main>
  )
}

export default App
