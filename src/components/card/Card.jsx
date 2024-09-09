// eslint-disable-next-line react/prop-types
const Card = ({ children, customClassName }) => {
  return (
    <article className={`card ${customClassName || ''}`}>
      {children}
    </article>
  )
}

export default Card
