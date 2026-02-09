import { useEffect, useState } from 'react'
import type { BlogPost } from './components/BlogPosts.tsx'
import { get } from './util/http.ts'
import BlogPosts from './components/BlogPosts.tsx'
import fetchingImg from './assets/data-fetching.png'

type RawDataBlogPost = {
  id: number
  title: string
  body: string
  userId: number
}

function App() {
  const [fetchedPost, setFetchedPost] = useState<BlogPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const data = await get<RawDataBlogPost[]>(
        'https://jsonplaceholder.typicode.com/posts',
      )

      const blogPosts: BlogPost[] = data.map((rawPost) => ({
        id: rawPost.id,
        title: rawPost.title,
        text: rawPost.body,
      }))

      setFetchedPost(blogPosts)
    }

    fetchPosts()
  }, [])

  return (
    <main>
      <img
        src={fetchingImg}
        alt='An abstract image depicting a data fetching process'
      />
      <BlogPosts posts={fetchedPost} />
    </main>
  )
}

export default App
