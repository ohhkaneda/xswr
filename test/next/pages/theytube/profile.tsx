import { XSWR } from "@hazae41/xswr";
import { useCallback } from "react";
import { fetchAsJson } from "./fetcher";

export interface ProfileData {
  id: string
  nickname: string
}

export function getProfileSchema(id: string) {
  return XSWR.single<ProfileData>(
    `/api/theytube/profile?id=${id}`,
    fetchAsJson)
}

export function getProfileNormal(profile: ProfileData) {
  return new XSWR.Normal(profile, getProfileSchema(profile.id), profile.id)
}

export function useProfile(id: string) {
  const handle = XSWR.use(getProfileSchema, [id])
  XSWR.useFetch(handle)
  return handle
}

export function Profile(props: { id: string }) {
  const profile = useProfile(props.id)

  const onRenameClick = useCallback(() => {
    if (!profile.data) return
    profile.mutate(c => c && ({ data: c.data && { ...c.data, nickname: "John Doe" } }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data, profile.mutate])

  if (!profile.data) return null

  return <div className="text-gray-500">
    {profile.data.nickname}
    <button onClick={onRenameClick}>
      Rename
    </button>
  </div>
} 