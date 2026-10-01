import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import Image from "next/image"

// Components made available inside MDX bodies (e.g. `<Image ... />` in a post)
const components = {
  Image
}

type MdxProps = {
  source: MDXRemoteSerializeResult
}

export function Mdx({ source }: MdxProps) {
  return <MDXRemote {...source} components={components} />
}
