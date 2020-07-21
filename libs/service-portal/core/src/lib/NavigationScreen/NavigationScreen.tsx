import React, { FC } from 'react'
import { Typography, Box, Tiles } from '@island.is/island-ui/core'
import { Link } from 'react-router-dom'
import { Card } from '@island.is/web/components/Card/Card'

export interface NavigationScreenItem {
  name: string
  url: string
  text: string
  tags: string[]
}

interface Props {
  items: NavigationScreenItem[]
}

export const NavigationScreen: FC<Props> = ({ items }) => {
  return (
    <>
      <Box marginBottom={4}>
        <Typography variant="h2" as="h2">
          Stillingar
        </Typography>
      </Box>
      <Tiles space="gutter" columns={2}>
        {items.map((item, index) => (
          <Link to={item.url} key={index}>
            <Card
              title={item.name}
              description={item.text}
              tags={item.tags.map((x) => ({ title: x }))}
            />
          </Link>
        ))}
      </Tiles>
    </>
  )
}

export default NavigationScreen
