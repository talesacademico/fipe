import { LoadingContainer } from './styled'

export const Loading = ({ isVisible = true }) => {
  return (
    <>
      {isVisible &&
        <LoadingContainer>
          <h2>Carregando...</h2>
          <progress></progress>
        </LoadingContainer>}
    </>
  )
}