'use server'

export type CreatePostState = {
  errors?: {
    title?: string[]
    content?: string[]
  }
  message?: string
}

export async function createPost(
  prevState: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const title = (formData.get('title') as string)?.trim()
  const content = (formData.get('content') as string)?.trim()

  const errors: CreatePostState['errors'] = {}

  if (!title) {
    errors.title = ['Title is required.']
  }

  if (!content) {
    errors.content = ['Content is required.']
  }

  if (errors.title || errors.content) {
    return { errors }
  }

  // TODO: persist to database

  return { message: 'Post published successfully!' }
}
