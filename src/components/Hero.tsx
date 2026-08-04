type HeroProps = {
  title: string
  subtitle: string
}

function Hero({ title, subtitle }: HeroProps) {
  return (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  )
}

export default Hero