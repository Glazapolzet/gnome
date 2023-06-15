import {FC, ReactElement} from "react";
import {Box, Title, Subtitle} from "./styled";


interface CardProps {
  title: string,
  subtitle: string,
  content: ReactElement,
}

const Card: FC<CardProps> = ({title, subtitle, content}) => {
  return (
    <Box>
      <Title>
        {title}
      </Title>
      <Subtitle>
        {subtitle}
      </Subtitle>

      {content}
    </Box>
  )
}

export default Card;