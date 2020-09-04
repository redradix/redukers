type Action<P> = {
  type: string,
  payload?: P
}

type Pattern<P> =
  | string
  | Array<string>
  | ((action: Action<P>) => boolean)
