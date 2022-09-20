import { XSWR } from "@hazae41/xswr";
import { useCallback } from "react";
import { fetchAsJson } from "../../libs/fetcher";
import { getProfileNormal, getProfileSchema, Profile, ProfileData } from "./profile";

export interface CommentData {
  id: string,
  author: ProfileData,
  text: string
}

export interface NormalizedCommentData {
  id: string,
  author: { id: string },
  text: string
}

export function getCommentSchema(id: string) {
  function normalizer(comment: CommentData) {
    const author = typeof comment.author !== "string"
      ? getProfileNormal(comment.author)
      : comment.author
    return { ...comment, author }
  }

  return XSWR.single<CommentData, Error, NormalizedCommentData>(
    `/api/theytube/comment?id=${id}`,
    fetchAsJson,
    { normalizer })
}

export function getCommentNormal(comment: CommentData) {
  return new XSWR.Normal(comment, getCommentSchema(comment.id), comment.id)
}

export function useComment(id: string) {
  const handle = XSWR.use(getCommentSchema, [id])
  XSWR.useFetch(handle)
  return handle
}

export function Comment(props: { id: string }) {
  const { make } = XSWR.useXSWR()
  const comment = useComment(props.id)

  const onChangeAuthorClick = useCallback(() => {
    if (!comment.data) return

    const John69 = make(getProfileSchema("1518516160"))
    if (!John69.state) return

    const author = John69.state.data!

    comment.mutate(c => c && ({ data: c.data && ({ ...c.data, author }) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.data, comment.mutate])

  if (!comment.data) return null

  return <div className="p-4 border border-solid border-gray-500">
    <Profile id={comment.data.author.id} />
    <pre className="whitespace-pre-wrap">
      {comment.data.text}
    </pre>
    <button onClick={onChangeAuthorClick}>
      Change author
    </button>
  </div>
}

export default function Page() {
  return null
}