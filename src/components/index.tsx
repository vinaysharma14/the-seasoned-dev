import { FC } from 'react';

interface Props {
  text: string;
  href: string;
}

export const Link: FC<Props> = ({ href, text }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);
