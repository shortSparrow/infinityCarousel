type InitialList = {
  id: string
  image: any
}[]

export const generateFakeItems = (initialList: InitialList, count: number) => {
  let newList = [...initialList]

  for (let i = 0; i < count; i++) {
    const rest = i % initialList.length
    let index = i < initialList.length ? i : rest
    let nextIndex = index === initialList.length - 1 ? 0 : index + 1

    const newItemEnd = { ...initialList[index], id: `${initialList[index].id}-fake-end-${i}` }
    const newItemStart = {
      ...initialList[nextIndex],
      id: `${initialList[nextIndex].id}-fake-start-${i}`,
    }
    newList.push(newItemEnd)
    newList = [newItemStart, ...newList]
  }

  return newList
}
